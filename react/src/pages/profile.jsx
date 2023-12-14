import React from "react";
import AppLayout from "components/Layouts/AppLayout";
import { NavLink } from "react-router-dom";
import { useFetcher, useParams } from "react-router-dom";
import useSWR from "swr";
import axios from "lib/axios";
import ThreadList from "./threadList";
const Profile = () => {
    const { id } = useParams();

    const { data, error, isLoading } = useSWR(`api/profile/${id}`, (url) =>
        axios
            .get(url)
            .then((res) => {
                return res.data;
            })
            .catch((error) => {
                if (error.response.status !== 409) throw error;
            })
    );

    if (error) return <div>Error fetching data</div>;
    if (isLoading) return <div>Loading...</div>;
    return (
        <AppLayout
            header={
                <div className="flex justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Dashboard
                    </h2>
                    <NavLink
                        to="/create"
                        className="ml-4 text-sm text-gray-700 underline"
                    >
                        Create Post
                    </NavLink>
                </div>
            }
        >
            <div className="container mx-auto p-4 ">
            <h1 className="text-3xl font-bold mb-4">Forum Threads</h1>
            <ThreadList threads={data.blog_post} />
            <h1 className="text-3xl font-bold mb-4">Comments</h1>
            <ThreadList threads={data.comment} />
            </div>
        </AppLayout>
    );
};

export default Profile;
