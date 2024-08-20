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
    ClockIcon,
    PaperAirplaneIcon,
    ChartBarIcon
} from "@heroicons/react/24/solid";

const cardContents = [
    {
        cardIcon: ClockIcon,
        cardHeaderText: " List in 90 seconds ",
        cardContentText:
            " Sign up and start listing immediately completely for FREE."
    },
    {
        cardIcon: PaperAirplaneIcon,
        cardHeaderText: "Global Market Reach",
        cardContentText:
            " Expand your reach to international buyers and boost your revenue."
    },
    {
        cardIcon: ChartBarIcon,
        cardHeaderText: "Increased Revenue",
        cardContentText: "Retain higher margins by cutting out the middleman."
    }
];

export default function ForSellersSection() {
    return (
        <>
            <div className="w-auto h-auto pb-8 bg-gray-900 mt-0 pt-0">
                <div className="p-8 mx-auto mt-14">
                    <div className="container px-2 py-3 m-0 rounded-xl  mx-auto text-center text-white">
                        <Typography className="inline-flex text-xs rounded-3xl border-[1.5px] border-gray-400 py-1 lg:px-4 px-1 p-2 font-kanit font-normal">
                            For Sellers
                        </Typography>
                        <Typography className="font-bold font-kanit text-xl mt-3 text-amber-900">
                            List Your Products Easily 📝
                        </Typography>
                    </div>
                </div>
                <div className="mx-auto p-6 mb-4 pt-0  md:flex gap-x-4 items-center justify-center h-auto">
                    {cardContents.map(
                        (
                            { cardIcon, cardHeaderText, cardContentText },
                            key
                        ) => (
                            <div className=" p-4 bg-gray-800 md:border-2 mb-1 md:border-gray-700 rounded-2xl sm:w-full md:w-1/3 lg:w-1/3 xl:w-1/3 h-48 text-white ">
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
                                <cardFooter className="my-4 text-gray-400">
                                    {cardContentText}
                                </cardFooter>
                            </div>
                        )
                    )}
                </div>
                <div className="container p-6 m-1 rounded-xl mx-auto text-center text-white">
                    <Typography className="font-bold font-kanit text-md">
                        Note: We are only Currently onboarding suppliers from
                        Nigeria.
                    </Typography>
                </div>
            </div>
        </>
    );
}
