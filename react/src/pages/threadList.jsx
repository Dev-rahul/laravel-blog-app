import React from "react";
import { useNavigate } from "react-router-dom";
import AvatarIcon from "components/Avatar";
import { HandThumbUpIcon, EyeIcon } from "@heroicons/react/20/solid";
import { useAuth } from "hooks/auth";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

const ThreadList = ({ threads, type }) => {
    const navigate = useNavigate();
    const { user } = useAuth({ middleware: "auth" });

    return (
        <div>
            {threads.map((thread) => (
                <div
                    onClick={() =>
                        navigate(
                            `/blog/${
                                type === "comment"
                                    ? thread.blog_post_id
                                    : thread.id
                            }`
                        )
                    }
                    key={thread.id}
                    className="bg-white p-4 mb-4 rounded-md shadow-md cursor-pointer"
                >
                    <div onClick={() =>
                        navigate(
                            `/profile/${thread.author_id}`
                        )
                    } className="flex items-center mb-4 z-2">
                        <AvatarIcon name={thread.author_name} />
                        <span className="ml-2 text-gray-700">
                            {thread.author_name}
                        </span>
                    </div>
                    <h2 className="text-xl font-bold mb-2">{thread.title}</h2>
                    <p className="text-gray-600">
                        {type === "comment"
                            ? thread.content
                            : thread.plain_text}
                    </p>
                    <div className="flex justify-between mt-4">
                        <div className="flex items-center text-gray-500">
                            {type !== "comment" ? (
                                <>
                                    <EyeIcon className="h-5 w-5 text-gray-500 mr-1" />
                                    <span className="text-gray-500">
                                        {thread.views}
                                    </span>{" "}
                                </>
                            ) : null}

                            <HandThumbUpIcon className="h-5 w-5 ml-2 mr-1" />
                            <span className="text-gray-500">
                                {thread.likes}
                            </span>
                        </div>
                        {user.id === thread.author_id ? (
                            <div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevents the click from triggering the navigate action
                                        // Add your edit logic here, for example, redirect to an edit page
                                        navigate(`/edit/${thread.id}`);
                                    }}
                                    className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 focus:outline-none"
                                >
                                    Edit
                                </button>
                            </div>
                        ) : null}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ThreadList;
