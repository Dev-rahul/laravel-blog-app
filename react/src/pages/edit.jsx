import React, { useState, useRef, useEffect } from "react";
import AppLayout from "components/Layouts/AppLayout";
import ReactQuill from "react-quill";
import { useAuth } from "hooks/auth";
import { useNavigate, useParams } from "react-router-dom";
import axios from "lib/axios";
import useSWR from "swr";
import "react-quill/dist/quill.snow.css";

function Edit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");

    const { user } = useAuth({ middleware: "auth" });
    const ref = useRef(null);

    const { data, error, isLoading } = useSWR(`api/blog/${id}`, (url) =>
        axios
            .get(url)
            .then((res) => {
                setTitle(res.data.title);
                setContent(res.data.content);

                return res.data;
            })
            .catch((error) => {
                if (error.response.status !== 409) throw error;
            })
    );

    const modules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
            ],
            ["link", "image"],
            ["clean"],
        ],
    };

    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        const editor = ref.current.getEditor();
        const unprivilegedEditor = ref.current.makeUnprivilegedEditor(editor);
        const plainText = unprivilegedEditor.getText();
        console.log("data", content, plainText);

        axios
            .patch(`/api/blog/${id}`, {
                title: title,
                content: content,
                author_id: user.id,
                author_name: user.name,
                plain_text: plainText.substring(0, 200),
            })
            .then(function (res) {
                console.log(res);
                navigate("/dashboard");
            })
            .catch(function (error) {
                console.log(error);
            });
    };


    return (
        <AppLayout>
            {user?.id === data?.author_id ? (
                <div className="my-1 mx-10 ">
                    <div>
                        <div className="container mx-auto mt-8">
                            <h2 className="text-2xl font-semibold mb-4">
                                Edit You Thread
                            </h2>
                            <form
                                onSubmit={handleSubmit}
                                className="max-w-4xl mx-auto"
                            >
                                <div className="mb-4">
                                    <label
                                        htmlFor="title"
                                        className="block text-sm font-medium text-gray-600"
                                    >
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        value={title}
                                        onChange={(e) =>
                                            setTitle(e.target.value)
                                        }
                                        className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label
                                        htmlFor="content"
                                        className="block text-sm font-medium text-gray-600"
                                    >
                                        Content
                                    </label>
                                    <div className="bg-white">
                                        <ReactQuill
                                            ref={ref}
                                            className="border rounded-md focus:outline-none focus:ring focus:border-blue-300 "
                                            theme="snow"
                                            modules={modules}
                                            formats={formats}
                                            value={content}
                                            onChange={setContent}
                                        />
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                                >
                                    Edit 
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            ) : (isLoading ? <div>Is Loading....</div> :
                <div>
                    This is not you blog! You can only edit your own thread
                </div>
            )}
        </AppLayout>
    );
}

export default Edit;
