import React, { useState, useEffect } from "react";
import { Typography, Button, Input } from "@material-tailwind/react";
import { ArrowLongRightIcon } from "@heroicons/react/24/solid";
import NavbarComponent from "../components/NavbarComponent.tsx";
import FooterComponent from "../components/FooterComponent.tsx";

import { Outlet, Link } from "react-router-dom";
import { productsList } from "../Db/ProductList.tsx";
import { useCatalog } from "../contexts/queryFirestoreData.tsx";

export default function Catalog() {
    const { productsList, loading, error } = useCatalog();

    if (loading)
        return (
            <div className="justify-center flex  text-center">
                {" "}
                <p className="font-extrabold font-kanit text-xl text-amber-900 items-center m-5 mt-12">
                    {" "}
                    Loading....
                </p>
            </div>
        );
    if (error)
        return (
            <div className="justify-center flex  text-center">
                {" "}
                <p className="font-extrabold font-kanit text-xl text-red-700 items-center m-5 mt-12">
                    {" "}
                    error <br /> kindly refresh your browser
                </p>
            </div>
        );

    return (
        <>
            <NavbarComponent />
            <div className="mt-5">
                <Input className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200" />
            </div>
            <div className=" grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 m-3 gap-y-4 mt-5 ">
                {productsList.map(
                    ({
                        images,
                        id,
                        productName,
                        productPrice,
                        minOrderQty,
                        lga,
                        state,
                        phoneNumber,
                        descriptionMsg
                    }) => (
                        <div
                            key={id}
                            className="w-full flex-shrink-0 rounded-2xl flex justify-between  border-2 border-gray-100 flex-shrink-0 h-[14rem] "
                        >
                            <div
                                // floated={false}
                                //shadow={false}
                                className=" w-1/3 bg-gray-50 h-full jusify-start items-center rounded-s-2xl p-0 m-0 "
                            >
                                <img
                                    className="  object-fill object-cover rounded-tl-2xl"
                                    src={images[0]}
                                    alt={productName}
                                />
                            </div>
                            <div className="w-2/3 justify-end mx-auto my-auto">
                                <div className="px-3 py-1 mt-3 mb-2 text-left">
                                    <Typography
                                        variant="h6"
                                        className="font-bold mb-1 text-gray-700"
                                    >
                                        {productName}
                                    </Typography>
                                    <Typography className="mt-1 mb-0 pb-0 font-bold text-gray-800 font-kanit">
                                        &#8358; {productPrice} /Kg
                                    </Typography>
                                    <Typography className="font-normal text-gray-700 pt-0 mt-0 leading-none text-md font-kanit">
                                        MOQ {minOrderQty}
                                    </Typography>

                                    <Typography className="mt-3 font-normal text-gray-700 text-sm font-kanit">
                                        {lga}, {state}
                                    </Typography>

                                    <Link to={`/productsList/${id}`}>
                                        <Button className="text-orange-800 flex-grow text-sm flex items-center justify-end font-kanit bg-transparent shadow-none px-0 mt-4 border-1 border-orange-800 w-full  font-normal">
                                            Go to Listing {""}
                                            <ArrowLongRightIcon className="w-4 h-4 font-black" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )
                )}
            </div>
            <FooterComponent />
        </>
    );
}
