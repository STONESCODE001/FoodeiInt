import React from "react";
import ReactDOM from "react-dom/client";
import {
    Typography,
    Card,
    CardHeader,
    CardBody,
    CardFooter
} from "@material-tailwind/react";
import {
    ShoppingCartIcon,
    ShieldCheckIcon,
    CreditCardIcon
} from "@heroicons/react/24/solid";

const cardContents = [
    {
        cardIcon: ShieldCheckIcon,
        cardHeaderText: "Trade Assurance",
        cardContentText:
            " We ensure your products meet quality standards or you get your money back no questions asked. "
    },
    {
        cardIcon: ShoppingCartIcon,
        cardHeaderText: " Diverse Quality Product Range ",
        cardContentText:
            " Explore unique Nigerian and African food products not available in your local market."
    },
    {
        cardIcon: CreditCardIcon,
        cardHeaderText: "Cost Savings 💰",
        cardContentText:
            "Bypass middlemen and access competitive pricing directly from the source. "
    }
];

export default function ForBuyersSection() {
    return (
        <>
            <div className=" w-auto h-auto pb-0 mb-0 ">
                <div className="p-8 mx-auto mt-14">
                    <div className="container px-2 py-3 m-0 rounded-xl  mx-auto text-center">
                        <Typography className="inline-flex text-xs rounded-3xl border-[1.5px] border-gray-400 py-1 lg:px-4 px-1 p-2 font-kanit font-normal bg-gray-100">
                            For Buyers
                        </Typography>
                        <Typography className="font-bold font-kanit text-xl mt-3 ">
                            Shop with Confidence 🔒
                        </Typography>
                    </div>
                </div>
                <div className="mx-auto p-6 mb-4 pt-0 md:flex gap-x-4 items-center justify-center h-auto">
                    {cardContents.map(
                        (
                            { cardIcon, cardHeaderText, cardContentText },
                            key
                        ) => (
                            <div className=" p-4 bg-gray-100 md:border-2 mb-3 md:border-gray-200 sm:border-b-2 sm:border-gray-200 rounded-2xl sm:w-full md:w-1/3 lg:w-1/3 xl:w-1/3 h-64">
                                <cardHeader className="mb-3">
                                    {React.createElement(cardIcon, {
                                        className: "h-8 w-8 mb-4 mt-4"
                                    })}
                                </cardHeader>
                                <cardBody className=" mb-4">
                                    <Typography className="font-kanit font-bold mb-2">
                                        {cardHeaderText}
                                    </Typography>
                                </cardBody>
                                <cardFooter className="my-4 text-gray-700">
                                    {cardContentText}
                                </cardFooter>
                            </div>
                        )
                    )}
                </div>
            </div>
        </>
    );
}
