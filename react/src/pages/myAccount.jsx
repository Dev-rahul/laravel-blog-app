import { useEffect, useState } from "react";
import AppLayout from "components/Layouts/AppLayout";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import Input from "components/Input";
import Label from "components/Label";
import Button from "components/Button";
import axios from "lib/axios";
import useSWR from "swr";


const MyAccount = () => {
    


    
    const {
        register,
        setValue,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const { data, error, isLoading } = useSWR(`api/localGuardian`, (url) =>
    axios
        .get(url)
        .then((res) => {
            setValue("name", res.data.name)
            setValue("contact_number", res.data.contact_number)
            setValue("relationship", res.data.relationship)
            setValue("address", res.data.address)

            return res.data;
        })
        .catch((error) => {
            if (error.response.status !== 409) throw error;
        })
);

    const postCode = watch('postcode')
    const onSubmit = (data) => {
        console.log(data)
        axios.post('/api/localGuardian', {
            name: data.name,
            contact_number: data.contact_number,
            relationship: data.relationship,
            address:data.address
        })
        .then(function (res) {

        })
        .catch(function (error) {
          console.log(error);
        })
    };
    const handleClick = () => {
        axios.post('/api/postcode', {
            postcode: postCode
        })
        .then(function (res) {
            console.log(res)
            if(res.data.status === 200) {
                const data = res?.data?.result
                const text = data?.admin_ward + ', ' + data?.admin_district + ', ' +data?.country;
                setValue('address', text)
            }

        })
        .catch(function (error) {
          console.log(error);
        })
    };



    return (
        <AppLayout>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            Local Guardian Details
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="mt-4">
                                    <Label htmlFor="email">Name</Label>
                                    <input
                                        {...register("name", {
                                            required: true,
                                        })}
                                        className={`rounded-md shadow-sm border-gray-300
                                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
                                        aria-invalid={
                                            errors.name ? "true" : "false"
                                        }
                                    />
                                    {errors.name?.type === "required" && (
                                        <p className="text-[#ff0000]"  role="alert">Name is required</p>
                                    )}
                                </div>

                                <div className="mt-4">
                                    <Label htmlFor="contact_number">Phone</Label>
                                    <input
                                    type="number"
                                        {...register("contact_number", {
                                            required: true,
                                            minLength: 5,
                                            maxLength:10
                                        })}
                                        className={`rounded-md shadow-sm border-gray-300
                                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
                                        aria-invalid={
                                            errors.contact_number ? "true" : "false"
                                        }
                                    />
                                    {errors.number?.type === "required" && (
                                        <p className="text-[#ff0000]"  role="alert">Phone Number is required</p>
                                    )}
                                    {errors.number?.type !== "required" && errors.number && (
                                        <p className="text-[#ff0000]"  role="alert">Phone Number is not valid</p>
                                    )}
                                </div>

                                <div className="mt-4">
                                    <Label htmlFor="relationship">Relationship</Label>
                                    <input
                                        {...register("relationship", {
                                            required: true,
                                        })}
                                        className={`rounded-md shadow-sm border-gray-300
                                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
                                        aria-invalid={
                                            errors.relationship ? "true" : "false"
                                        }
                                    />
                                    {errors.relationship?.type === "required" && (
                                        <p className="text-[#ff0000]" role="alert">Relation is required</p>
                                    )}
                                </div>

                                <div className="mt-4">
                                    <Label htmlFor="relation">Post Code</Label>
                                    <input
                                      {...register("postcode")}
                                        className={`rounded-md shadow-sm border-gray-300
                                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
                                    />
                                    <Button type="button"  className="ml-4 bg-teal-700" onClick={handleClick}>Serach</Button>
                                </div>
                                <div className="mt-4">
                                    <Label htmlFor="relation">Address</Label>
                                    <textarea
                                        {...register("address", {
                                            required: true,
                                        })}
                                        className={`rounded-md shadow-sm border-gray-300
                                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
                                        aria-invalid={
                                            errors.address ? "true" : "false"
                                        }
                                    />
                                    {errors.address?.type === "required" && (
                                        <p className="text-[#ff0000]" role="alert">Address is required</p>
                                    )}
                                </div>

                                <Button className="mt-4">Save</Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default MyAccount;
