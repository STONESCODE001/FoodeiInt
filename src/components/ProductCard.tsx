import React from "react";
import {
    Rating,
    Typography,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Button
} from "@material-tailwind/react";

import { Outlet, Link } from "react-router-dom";
import { ArrowLongRightIcon } from "@heroicons/react/24/solid";
import Kuli from "../assets/images (5).jpeg";
import { productsList } from "../Db/ProductList.tsx";
import { useCatalog } from "../contexts/queryFirestoreData.tsx";

export default function FeaturedProductComponent() {
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
            <div className="flex justify-between px-4 mt-9 mb-3 items-center ">
                <div className="font-normal text-md font-kanit flex-shrink-0 ">
                    Featured Products
                </div>
                <Link to="/Catalog">
                    <Button className="text-orange-900 flex-grow text-sm flex items-center justify-end font-kanit bg-transparent shadow-none px-0 mx-0 font-normal">
                        Explore More{" "}
                        <ArrowLongRightIcon className="w-4 h-4 p-0 m-0 font-black" />
                    </Button>
                </Link>
            </div>

            <div className="flex w-auto h-auto p-4  overflow-x-scroll gap-5">
                {productsList.slice(0, 7).map(
                    ({
                        images, // `images` is an array with URLs
                        creationdate,
                        //uid,
                        id,
                        //userId,
                        productName,
                        productPrice,
                        minOrderQty,
                        lga,
                        state,
                        phoneNumber
                    }) => (
                        <Card
                            key={id}
                            className="w-[13rem] h-auto flex-shrink-0 max-w-[24rem] rounded-2xl text-left"
                        >
                            <CardHeader
                                floated={false}
                                shadow={false}
                                className="rounded-t-2xl rounded-b-none  bg-amber-700 !h-1/2 p-0 m-0"
                            >
                                <img
                                    className=" object-cover object-fill rounded-b-none"
                                    src={images[0]}
                                />
                            </CardHeader>
                            <CardBody className="px-3 py-1 mt-3 ">
                                <Typography
                                    variant="h6"
                                    className="font-bold mb-1 text-gray-700 "
                                >
                                    {productName}
                                </Typography>
                                <Typography
                                    variant="h6"
                                    color="blue-gray"
                                    className="mt-1 mb-0 pb-0 font-bold text-gray-800 font-kanit"
                                >
                                    &#8358; {productPrice} / Kg
                                </Typography>
                                <Typography className="font-normal text-gray-700 pt-0 mt-0 leading-none text-md font-kanit">
                                    MOQ: {minOrderQty} Kg
                                </Typography>
                                <Typography className="mt-2  font-normal text-gray-700 text-sm font-kanit">
                                    {lga} {state}
                                </Typography>
                                <Link to={`/productsList/${id}`}>
                                    <Button className="text-orange-900 flex-grow text-sm flex items-center justify-center font-kanit bg-orange-900 shadow-none px-0 mt-4 mb-3  w-full text-white font-normal">
                                        Go to Listing {""}
                                        <ArrowLongRightIcon className="w-4 h-4 font-black" />
                                    </Button>
                                </Link>
                            </CardBody>
                        </Card>
                    )
                )}
            </div>
        </>
    );
}
