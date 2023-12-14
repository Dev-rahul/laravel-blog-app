import React, { useState } from "react";
import AppLayout from "components/Layouts/AppLayout";
import { NavLink } from "react-router-dom";
import { useFetcher, useParams } from "react-router-dom";
import useSWR from "swr";
import axios from "lib/axios";
import ThreadList from "./threadList";
import ReactPaginate from 'react-paginate';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
const Profile = () => {
    const { id } = useParams();
    const [blogPage, setBlogPage] = useState(1)
    const [commentPage, setCommentPage] = useState(1)


    const { data, error, isLoading } = useSWR(`api/profile/${id}?blogPage=${blogPage}&commentPage=${commentPage}`, (url) =>
        axios
            .get(url)
            .then((res) => {
                return res.data;
            })
            .catch((error) => {
                if (error.response.status !== 409) throw error;
            })
    );

    const handleBlogPageClick = (event) => {
        setBlogPage(event.selected +1);
      };
      const handleCommentPageClick = (event) => {
        setCommentPage(event.selected +1);
      };
  

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
                <h1 className="text-3xl font-bold mb-4">Latest Threads</h1>
                {/* <ReactPaginate
                    breakLabel={breakLabel}
                    nextLabel={nextLabel}
                    onPageChange={handleBlogPageClick}
                    className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
                    pageClassName="isolate inline-flex -space-x-px rounded-md shadow-sm"
                    pageLinkClassName="relative inline-flex items-center px-4 py-2 text-sm font-semibold  ring-1 ring-inset ring-gray-300 hover:bg-blue-600 hover:text-[#FFFFFF] focus:z-20 focus:outline-offset-0"
                    activeClassName="relative z-10 inline-flex items-center bg-blue-500 text-sm font-semibold text-[#FFFFFF] focus:z-20 focus-visible:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    pageRangeDisplayed={2}
                    pageCount={data.last_page ?? 1}
                    previousLabel={previousLabel}
                    renderOnZeroPageCount={null}
                /> */}
                <ThreadList threads={data.blog_post} />
                <h1 className="text-3xl font-bold mb-4">Latest Comments</h1>
                {/* <ReactPaginate
                    breakLabel={breakLabel}
                    nextLabel={nextLabel}
                    onPageChange={handleCommentPageClick}
                    className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
                    pageClassName="isolate inline-flex -space-x-px rounded-md shadow-sm"
                    pageLinkClassName="relative inline-flex items-center px-4 py-2 text-sm font-semibold  ring-1 ring-inset ring-gray-300 hover:bg-blue-600 hover:text-[#FFFFFF] focus:z-20 focus:outline-offset-0"
                    activeClassName="relative z-10 inline-flex items-center bg-blue-500 text-sm font-semibold text-[#FFFFFF] focus:z-20 focus-visible:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    pageRangeDisplayed={2}
                    pageCount={data.last_page ?? 1}
                    previousLabel={previousLabel}
                    renderOnZeroPageCount={null}
                /> */}
                <ThreadList type="comment" threads={data.comment} />
            </div>
        </AppLayout>
    );
};

export default Profile;


const nextLabel = (
    <a
        href="#"
        className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
    >
        <span className="sr-only">Next</span>
        <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
    </a>
);

const previousLabel = (
    <div className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
        <span className="sr-only">Previous</span>
        <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
    </div>
);

const breakLabel = (
    <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
        ...
    </span>
);