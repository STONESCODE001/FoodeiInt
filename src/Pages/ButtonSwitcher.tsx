import React, { useState } from "react";
import { Typography, Button, Avatar } from "@material-tailwind/react";
import { RocketLaunchIcon } from "@heroicons/react/24/solid";
import { ListingComponent } from "../components/listingComponent.tsx";

const ButtonSwitcher = () => {
    const [activeButton, setActiveButton] = useState(null);

    const renderContent = () => {
        switch (activeButton) {
            case "button1":
                return (
                    <div>
                        {" "}
                        <ListingComponent />{" "}
                    </div>
                );
            case "button2":
                return (
                    <div className="p-7 pt-3 mt-0 text-center mx-auto font-kanit">
                        <div className="bg-orange-800 p-4 text-white mb-3 rounded-xl">
                            <RocketLaunchIcon className="w-7 h-7 w-full" />
                        </div>
                        We are Currently Working on this Feature, Sorry for the
                        delay
                        <div className=" mt-10">
                            <Typography className="font-bold font-kanit">
                                Have a Request?
                            </Typography>
                            <Button size="lg">Chat Us Up.</Button>
                        </div>
                    </div>
                );
            case "button3":
                return (
                    <div className="p-7 pt-3 mt-0 font-kanit">
                        <div className="bg-orange-800 rounded-xl p-4 text-white mb-3">
                            <RocketLaunchIcon className="w-7 h-7 text-white w-full " />
                        </div>
                        We are Currently Working On this Feature, Sorry for the
                        delay
                        <div className=" mt-10">
                            <Typography className="font-bold font-kanit">
                                Have a Request?
                            </Typography>
                            <Button size="lg" className=" ">
                                Chat Us Up.
                            </Button>
                        </div>
                    </div>
                );
            default:
                return <div>Select a button to see content</div>;
        }
    };

    return (
        <>
            <div class="grid min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible">
                <div class="flex w-full divide-x divide-gray-800 row">
                    <button
                        onClick={() => setActiveButton("button1")}
                        class="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none block w-full rounded-r-none border-r-0"
                        type="button"
                    >
                        List Produce
                    </button>
                    <button
                        onClick={() => setActiveButton("button2")}
                        class="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none block w-full rounded-r-none border-r-0 rounded-l-none"
                        type="button"
                    >
                        Listed Produce
                    </button>
                    <button
                        onClick={() => setActiveButton("button3")}
                        class="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none block w-full rounded-l-none"
                        type="button"
                    >
                        Order History
                    </button>
                </div>
            </div>
            <div>{renderContent()}</div>
        </>
    );
};

export default ButtonSwitcher;
