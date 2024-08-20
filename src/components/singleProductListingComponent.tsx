import React, { useState, useEffect } from "react";
import {
    Rating,
    Typography,
    Button,
    Carousel,
    Accordion,
    AccordionHeader,
    AccordionBody,
    Card
} from "@material-tailwind/react";
import NavbarComponent from "../components/NavbarComponent.tsx";
import {
    ArrowLeftIcon,
    CreditCardIcon,
    TruckIcon,
    PhoneIcon,
    ShieldCheckIcon
} from "@heroicons/react/24/outline";
import Kuli from "../assets/images (5).jpeg";
import FeaturedProductComponent from "../components/ProductCard.tsx";
import FooterComponent from "../components/FooterComponent.tsx";
import { useParams } from "react-router-dom";
//import { productsList } from "../Db/ProductList.tsx";
import { useCatalog } from "../contexts/queryFirestoreData.tsx";
import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContexts.tsx";
import ErrorPage from "../Pages/errorPage.tsx";
import WaitingListComponent from "./WaitingList.tsx";

const perk = [
    {
        perksIcon: CreditCardIcon,
        header: "Secured Payments",
        body: "All payments are encrypted with bank-level security."
    },
    {
        perksIcon: TruckIcon,
        header: "80% discounted shipping",
        body: "You get savings up to 80% with our licensed partners."
    },
    {
        perksIcon: PhoneIcon,
        header: "24/7 customer support",
        body: "Call us or Chat us at +(234) 915-140-0630 with any questions."
    }
];

const faqcontents = [
    {
        header: "Description",
        content: " Description is this"
    }
];

function SingleProductPage() {
    const { user } = useAuth();
    const [open, setOpen] = React.useState(2);

    const handleOpen = value => setOpen(open === value ? 0 : value);

    const { productsList, loading, error } = useCatalog();
    //const { productId } = useParams<{ productId: string }>();
    const { id } = useParams<{ id: string }>();
    console.log("productUid", id);
    const product = productsList.find(p => p.id === id);

    if (!product) {
        return (
            <>
                <ErrorPage />
            </>
        );
    }

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

    const handleScroll = () => {
        const element = document.getElementById("target-section");
        if (element) {
            //setIsHighlighted(true);
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <>
            <div className="md:flex justify-around mt-5">
                <div className="m-2 md:w-1/2">
                    <div className="w-full">
                        <Carousel className=" rounded-xl">
                            {product.images[0] && (
                                <img
                                    src={product.images[0]}
                                    alt="image 1"
                                    className="h-full w-full object-cover"
                                />
                            )}
                            {product.images[1] && (
                                <img
                                    src={product.images[1]}
                                    alt="image 2"
                                    className="h-full w-full object-cover"
                                />
                            )}
                            {product.images[2] && (
                                <img
                                    src={product.images[2]}
                                    alt="image 3"
                                    className="h-full w-full object-cover"
                                />
                            )}
                        </Carousel>
                    </div>
                    <div className=" py-3 px-3 mt-3">
                        <Typography
                            variant="h4"
                            className="font-bold mb-1 text-gray-800"
                        >
                            {product.productName}
                        </Typography>
                        <Typography
                            varient="h5"
                            className="font-bold  text-gray-800"
                        >
                            MOQ: {product.minOrderQty} kg
                        </Typography>
                        <Typography className="mt-1 font-normal text-gray-800 text-sm font-kanit">
                            From {product.lga} {product.state}
                        </Typography>
                        <hr className="mt-2 mb-4 max-w-xs" />
                        <div className="">
                            {perk.map(({ perksIcon, header, body }, key) => (
                                <div className="flex p-0 m-0 mb-4">
                                    {" "}
                                    {React.createElement(perksIcon, {
                                        className:
                                            "w-1/5 h-7 !p-0 !m-0 text-gray-900 mx-auto"
                                    })}
                                    <div className="w-4/5">
                                        <Typography className="font-normal text-gray-800">
                                            {header}
                                        </Typography>
                                        <Typography className="text-gray-700">
                                            {body}{" "}
                                        </Typography>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <hr className="mt-2 mb-4 max-w-xs" />

                        {faqcontents.map((faq, index) => (
                            <Accordion key={index} open={open === index + 1}>
                                <AccordionHeader
                                    className="font-kanit font-bold text-lg"
                                    onClick={() => handleOpen(index + 1)}
                                >
                                    {faq.header}
                                </AccordionHeader>
                                <AccordionBody className=" text-md text-normal">
                                    {product.descriptionMsg}
                                </AccordionBody>
                            </Accordion>
                        ))}
                    </div>
                </div>
                <div className="md:w-1/2 mt-5 p-3">
                    <Card className=" border border-gray-500">
                        <div>
                            <div className=" m-1 p-5 text-center">
                                <Typography
                                    variant="h4"
                                    className="font-bold font-kanit  text-gray-700 "
                                >
                                    {product.productPrice} / Kg
                                </Typography>

                                <Typography className="text-gray-600 text-sm">
                                    {" "}
                                    Price excludes shipping cost and tax.
                                </Typography>
                            </div>
                            <hr className="mt-2 mb-4 w-full !bg-gray-500" />
                            <div className=" px-8">
                                <a
                                    href="#target-section"
                                    onClick={e => {
                                        e.preventDefault();
                                        handleScroll();
                                    }}
                                    className="text-blue-500 underline cursor-pointer"
                                >
                                    <Button className="border border-orange-800 w-full bg-transparent mt-5 font-kanit text-orange-800 font-normal p-5 ">
                                        {" "}
                                        Place Order{" "}
                                    </Button>
                                </a>
                                <a
                                    href="#target-section"
                                    onClick={e => {
                                        e.preventDefault();
                                        handleScroll();
                                    }}
                                    className="text-blue-500 underline cursor-pointer"
                                >
                                    <Button className="border border-orange-800 w-full bg-transparent mt-5 font-kanit text-orange-800 font-normal p-5 ">
                                        {" "}
                                        Contact Seller{" "}
                                    </Button>
                                </a>
                            </div>
                            <hr className="mt-4 mb-4 w-full text-gray-500" />
                            <div>
                                <div className="flex p-3 m-0 mb-4">
                                    <ShieldCheckIcon className="w-1/5 h-7 !p-0 !m-0 text-orange-800 mx-auto" />
                                    <div className="w-4/5 ">
                                        <Typography className="font-medium text-gray-800">
                                            Foodei's Purchase Protection™
                                        </Typography>
                                        <Typography className="text-gray-700">
                                            Get refunded if you don't receive
                                            your item or it's not as described.
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </>
    );
}

export default function ProductListingComponent() {
    return (
        <>
            <NavbarComponent />
            <SingleProductPage />
            <FeaturedProductComponent className="mt-4" />
            <div id="target-section">
                <WaitingListComponent className="mt-3" />
            </div>
            <FooterComponent className="mt-5" />
        </>
    );
}

/*{" "}
                                <Link to={user ? `/Checkout/${id}` : "/Signin"}>
                                    <Button className="bg-orange-800 w-full font-kanit font-normal p-5 ">
                                        {" "}
                                        Order Now{" "}
                                    </Button>
                                </Link>
                                <Link to={user ? "/Catalog" : "/SignIn"}>
                                    <Button className="border border-orange-800 w-full bg-transparent mt-5 font-kanit text-orange-800 font-normal p-5 ">
                                        {" "}
                                        Contact Seller{" "}
                                    </Button>
                                </Link>
                                {""} */
