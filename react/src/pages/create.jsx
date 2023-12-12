import React, { useState } from "react";
import AppLayout from "components/Layouts/AppLayout";
import Input from "components/Input";
import Label from "components/Label";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
function Create(props) {
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");

   const modules = {
        toolbar: [
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic', 'underline','strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          ['link', 'image'],
          ['clean']
        ],
      }
    
     const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
      ]

      const handleSubmit = (e) => {
        e.preventDefault();
        console.log('data', content)
      }

    return (
        <AppLayout>
            <div className="my-1 mx-10 ">
                <div>
                    <div className="container mx-auto mt-8">
                        <h2 className="text-2xl font-semibold mb-4">
                            Create New Thread
                        </h2>
                        <form  onSubmit={handleSubmit} className="max-w-4xl mx-auto">
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
                                    onChange={(e) => setTitle(e.target.value)}
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
                                Create Thread
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

export default Create;
