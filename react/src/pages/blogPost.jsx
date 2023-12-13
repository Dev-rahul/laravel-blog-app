import { useState, useEffect } from "react";
import axios from "lib/axios";
import AppLayout from "components/Layouts/AppLayout";
import { useFetcher, useParams } from "react-router-dom";
import AvatarIcon from "components/Avatar";
import { HandThumbUpIcon, EyeIcon } from "@heroicons/react/20/solid";
import useSWR from "swr";

const fetcher = (url) => axios.get(url).then((res) => res.json());

const BlogPost = () => {
    const { id } = useParams();

    const { data, error, isLoading } = useSWR(`api/blog/${id}`, (url) =>
        axios
            .get(url)
            .then((res) => res.data)
            .catch((error) => {
                if (error.response.status !== 409) throw error;
            })
    );

    const [likes, setLikes] = useState(0);
    const [liked, setLiked] = useState(false);

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

    useEffect(() => {
        if (!isLoading) {
            setLikes(data.likes);
        }
    }, [isLoading]);

    if (error) return <div>Error fetching data</div>;
    if (isLoading) return <div>Loading...</div>;

    return (
        <AppLayout>
            <div className="max-w-2xl mx-auto my-8 bg-gray-100 p-8 rounded-md shadow-md">
                <div className="relative z-10 text-gray-800">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                            <AvatarIcon name={data.author_name} />
                            <div className="ml-4">
                                <p className="text-gray-600">
                                    {data.author_name}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {data.created_at}
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
                    <h2 className="text-3xl font-bold mb-4">{data.title}</h2>
                    <p className="text-gray-700"><div dangerouslySetInnerHTML={{ __html: data.content }} /></p>

                    {/* Comment Section */}
                    {/* <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Comments</h3>
          {comments.map((comment) => (
            <div key={comment.id} className="mb-4">
              <div className="flex items-center mb-2">
                <AvatarIcon name={comment.user.name} />
                <p className="ml-4 text-gray-600">{comment.user.name}</p>
              </div>
              <p className="text-gray-700">{comment.text}</p>
            </div>
          ))}
        </div> */}
                    <div className="mt-8">
                        <textarea
                            className="w-full p-4 border rounded-md bg-white"
                            placeholder="Add your comment..."
                        />
                        <button className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-md">
                            Post Comment
                        </button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default BlogPost;
