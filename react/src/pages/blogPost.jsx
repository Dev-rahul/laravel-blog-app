import { useState, useEffect, Fragment } from "react";
import axios from "lib/axios";
import AppLayout from "components/Layouts/AppLayout";
import { useFetcher, useParams , useNavigate} from "react-router-dom";
import AvatarIcon from "components/Avatar";
import { HandThumbUpIcon, EyeIcon } from "@heroicons/react/20/solid";
import useSWR from "swr";
import dayjs from "dayjs";
import { useAuth } from "hooks/auth";
import { Dialog, Transition } from "@headlessui/react";

const BlogPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth({ middleware: "auth" });
    const [isOpen, setIsOpen] = useState(false);
    const [likes, setLikes] = useState(0);
    const [liked, setLiked] = useState(false);
    const [value, setValue] = useState("");
    const [editComment, setEditComment] = useState("");
    const [editCommentID, setEditCommentID] = useState(null)

    const { data, error, isLoading } = useSWR(`api/blog/${id}`, (url) =>
        axios
            .get(url)
            .then((res) => {
                setLikes(res.data.likes);
                return res.data;
            })
            .catch((error) => {
                if (error.response.status !== 409) throw error;
            })
    );



    const handleLike = () => {
        if (!liked) {
            axios
                .get(`api/blog/liked/${id}`)
                .then(function (res) {
                    setLikes(likes + 1);
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            axios
                .get(`api/blog/disliked/${id}`)
                .then(function (res) {
                    setLikes(likes - 1);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        setLiked(!liked);
    };

    const handleClick = () => {
        console.log("handleClick", value);
        axios
            .post(`api/comment`, {
                content: value,
                blog_post_id: id,
            })
            .then(function (res) {
                console.log("res", res);
                window.location.reload();
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const closeModal = () => {
        setIsOpen(false);
    }
    const editAndClose=()=> {
        setIsOpen(false);
        axios
        .patch(`api/comment/${editCommentID}`, {
            content: editComment,
        })
        .then(function (res) {
            console.log("res", res);
            window.location.reload();
        })
        .catch(function (error) {
            console.log(error);
        });

    }

    const openModal =(comment) =>{
        setEditComment(comment.content)
        setEditCommentID(comment.id)
        setIsOpen(true);
    }

    if (error) return <div>Error fetching data</div>;
    if (isLoading) return <div>Loading...</div>;

    return (
        <AppLayout>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Edit Comment
                                    </Dialog.Title>
                                    <textarea
                                        value={editComment}
                                        onChange={(e) =>
                                            setEditComment(e.target.value)
                                        }
                                        className="w-full p-4 border rounded-md bg-white"
                                        placeholder="Add your comment..."
                                        autoFocus
                                    />

                                    <div className="mt-4">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={editAndClose}
                                        >
                                            Edit
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
            <div className="max-w-2xl mx-auto my-8 bg-gray-100 p-8 rounded-md shadow-md">
                <div className="relative z-10 text-gray-800">
                    <div className="flex items-center justify-between mb-4">
                        <div onClick={() =>
                        navigate(
                            `/profile/${data.author_id}`
                        )}  className="flex items-center">
                            <AvatarIcon name={data.author_name} />
                            <div className="ml-4">
                                <p className="text-gray-600">
                                    {data.author_name}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {dayjs(data.created_at).format(
                                        "h:mm:ss A - MM/DD/YY"
                                    )}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="mr-4 flex items-center">
                                <EyeIcon className="h-5 w-5 text-gray-500 mr-1" />
                                <span className="text-gray-500">
                                    {data?.views}
                                </span>
                            </div>
                            <div className="flex items-center">
                                <button
                                    className={`mr-2 px-3 py-1 text-sm rounded-md ${
                                        liked
                                            ? "bg-blue-500 text-white"
                                            : "bg-gray-300 text-gray-600"
                                    }`}
                                    onClick={handleLike}
                                >
                                    {liked ? (
                                        <HandThumbUpIcon className="h-5 w-5" />
                                    ) : (
                                        <HandThumbUpIcon className="h-5 w-5" />
                                    )}
                                </button>
                                <span className="text-gray-600">
                                    {likes} Likes
                                </span>
                            </div>
                        </div>
                    </div>
                    {/* <hr class="my-6 h-[1px]  border-t-0 bg-[#4B5563] opacity-100 dark:opacity-50 mx-16"  /> */}

                    <h2 className="text-3xl font-bold mb-4">{data.title}</h2>
                    <p className="text-gray-700">
                        <div
                            dangerouslySetInnerHTML={{ __html: data.content }}
                        />
                    </p>
                    <hr className="my-6 h-[1px] border-t-0 bg-[#4B5563] opacity-100 dark:opacity-50" />
                    <div className="mt-8">
                        <h3 className="text-xl font-bold mb-4">Comments</h3>
                        {data.comments &&
                            data.comments.map((comment) => (
                                <div key={comment.id} className="mb-4">
                                    <div className="flex  justify-between">
                                        <div onClick={() =>
                        navigate(
                            `/profile/${comment.author_id}`
                        )} className="flex items-center mb-2">
                                            <AvatarIcon
                                                name={comment.author_name}
                                            />
                                            <div className="ml-4">
                                                <p className="text-gray-600">
                                                    {comment.author_name}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    {dayjs(
                                                        comment.created_at
                                                    ).format(
                                                        "h:mm:ss A - MM/DD/YY"
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                        {user.id === data.author_id ? (
                                            <div>
                                                <button
                                                    onClick={() =>openModal(comment)}
                                                    className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 focus:outline-none"
                                                >
                                                    Edit
                                                </button>
                                            </div>
                                        ) : null}
                                    </div>
                                    <p className="text-gray-700">
                                        {comment.content}
                                    </p>
                                </div>
                            ))}
                    </div>
                    <div className="mt-8">
                        <textarea
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            className="w-full p-4 border rounded-md bg-white"
                            placeholder="Add your comment..."
                        />
                        <button
                            onClick={handleClick}
                            className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-md"
                        >
                            Post Comment
                        </button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default BlogPost;
