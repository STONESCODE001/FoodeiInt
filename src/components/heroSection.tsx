import React from "react";
import { Typography, Button } from "@material-tailwind/react";
import cherryTomatoImage from "../assets/hand-holding-cherry-tomato-plastic-crate-market.jpeg";
import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContexts.tsx";

/*export default function ImgWithBlurredCaption() {
    return (
        <div className="relative h-96 w-full flex justify-center items-center">
            <img
                className="absolute inset-0 h-full w-full object-cover brightness-50 bg-blend-darken"
                src={cherryTomatoImage}
                alt="Hero Section Image"
            />
            <header className="relative text-center p-8">
                <div className="bg-black bg-opacity-60 px-4 py-5 rounded-xl">
                    <Typography
                        variant="h1"
                        className="leading-snug text-white font-bold text-3xl lg:text-5xl"
                    >
                        <span className="text-orange-700">FOODEI</span> – Your
                        Gateway to{" "}
                        <span className="text-green-500">
                            Fresh Nigerian Produce
                        </span>
                    </Typography>
                    <Typography
                        variant="h6"
                        className="text-white text-sm lg:text-lg my-4 text-gray-300"
                    >
                        Experience the future of food sourcing. Connect directly
                        with trusted Nigerian farmers and suppliers. We ensure
                        quality, handle logistics, and take on all risks – from
                        farm to table, we’ve got you covered.
                    </Typography>

                    <div className="flex justify-center gap-4 mt-6">
                        <Link to="/Catalog">
                            <Button className="bg-transparent border-2 border-orange-500 text-orange-500 px-6 py-3 font-bold">
                                Browse Foodei
                            </Button>
                        </Link>
                        <Link to="/SignIn">
                            <Button className="bg-orange-700 text-white px-6 py-3 font-bold">
                                Join Waitlist
                            </Button>
                        </Link>
                    </div>
                </div>
            </header>
        </div>
    );
}*/

export default function ImgWithBlurredCaption() {
    //const { user, loading } = useAuth();

    return (
        <div className=" relative h-96 w-full flex justify-center items-center">
            <img
                className="absolute inset-0 h-full w-full object-cover brightness-50 bg-blend-darken"
                src={cherryTomatoImage}
                alt="Hero Section Image"
            />

            <header className=" relative text-center px-1">
                <div className=" container px-6 py-5 m-0 text-center rounded-xl bg-black bg-opacity-20 ">
                    <Typography
                        variant="h1"
                        className="mx-auto my-6 w-full leading-snug text-white font-black !text-3xl lg:max-4xl lg:!text-5xl mb-3 text-center font-kanit"
                    >
                        {" "}
                        <span className="text-orange-700 font-kanit">
                            {" "}
                            FOODEI{" "}
                        </span>{" "}
                        <span className=" ">
                            {" "}
                            Connecting You with Nigerian Food Suppliers &
                            Farmers{" "}
                        </span>
                    </Typography>
                    <Typography
                        variant="h6"
                        className="text-white !text-sm mb-3 text-center text-gray-300 font-semibold"
                    >
                        {" "}
                        <span className=" ">
                            {" "}
                            🌾 Order directly from trusted Nigerian suppliers
                            and farmers. We handle logistics, quality checks,
                            and take on the risks, so you receive authentic
                            products with ease. 🥘.{" "}
                        </span>
                    </Typography>

                    <div className="flex justify-evenly mx-auto  gap-3">
                        <Link to="/Catalog">
                            <Button className="m-2 p-2.5 bg-transparent border-2 border-orange-500">
                                Browse Foodei
                            </Button>
                        </Link>
                    </div>
                </div>
            </header>
        </div>
    );
}
/*
export default function ImgWithBlurredCaption() {
    const { user, loading } = useAuth();

    return (
        <div className="relative h-96  w-auto flex justify-center">
            <img
                className="h-full w-full  object-cover border-b-2xl object-center brightness-50 bg-blend-darken "
                src={cherryTomatoImage}
                alt="Hero Section Image"
            />
            <header className="p-8 absolute bottom-8 mx-auto my-auto ">
                <div className=" container px-2 py-3 m-0 text-center rounded-xl">
                    <Typography className="inline-flex text-xs rounded-lg border-[1.5px] border-gray-50 bg-white py-1 lg:px-4 px-1 font-medium text-primary">
                        Exciting News! We are adding more categories
                    </Typography>
                    <Typography
                        variant="h1"
                        className="mx-auto my-6 w-full leading-snug text-white font-black !text-3xl lg:max-4xl lg:!text-5xl mb-3 text-center font-kanit"
                    >
                        {" "}
                        <span className="text-orange-700 font-kanit">
                            {" "}
                            FOODEI:{" "}
                        </span>{" "}
                        <span className=" "> Connecting Buyers </span>{" "}
                        <span className=" ">
                            {" "}
                            Directly with Nigerian Food Suppliers{" "}
                        </span>
                    </Typography>

                    <div className="flex justify-evenly mx-auto  gap-3">
                        <Link to="/Catalog">
                            <Button className="m-2 p-3 bg-transparent border-2 border-orange-500">
                                Browse Foodei
                            </Button>
                        </Link>
                        {loading ? (
                            <div className="animate-pulse">
                                <div className="h-8 w-full bg-gray-300  rounded"></div>
                            </div>
                        ) : (
                            <Link to={user ? "/Dashboard" : "/SignIn"}>
                                <Button
                                    className="bg-orange-700 font-bold m-2 p-3 font-black"
                                    type="button"
                                >
                                    Start Selling
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>
            </header>
        </div>
    );
}*/
