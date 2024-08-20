import React, { useState, useEffect } from "react";
import { Typography, Button } from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import ErrorPage from "./errorPage.tsx";
import { productsList } from "../Db/ProductList.tsx";
import Kuli from "../assets/images (5).jpeg";
import {
    CitySelect,
    CountrySelect,
    StateSelect,
    LanguageSelect
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import {
    GetCountries,
    GetState,
    GetCity,
    GetLanguages //async functions
} from "react-country-state-city";
import { Convert } from "easy-currencies";

export default function CheckoutPage() {
    //const TSHIIP_API_SECRET_KEY = process.env.TSHIP_API_SECRET_KEY;
    //const converter = new Converter();
    const [countryid, setCountryid] = useState(0);
    const [selectedCountry, setSelectedCountry] = useState("");
    const [countryIsoCode, setCountryIsoCode] = useState("");
    const [currencysymbol, setCurrencysymbol] = useState("");
    const [currency, setCurrency] = useState("");

    const [stateid, setstateid] = useState(0);
    const [selectedState, setSelectedState] = useState("");

    const [selectedCity, setSelectedCity] = useState("");
    const [cityid, setcityid] = useState(null);

    const { productId } = useParams();
    const product = productsList.find(p => p.productId === productId);

    const [quantity, setQuantity] = useState(1);
    const pricePerGram = product?.pricePerGram || 0;
    const minOrder = product?.minOrder || 0;

    if (!product) {
        return <ErrorPage />;
    }

    const subtotal = pricePerGram * quantity;
    const shippingCost = 2;
    const total = subtotal + shippingCost;
    const [convertedValue, setConvertedValue] = useState(0);

    const [cityList, setCityList] = useState([]);

    useEffect(() => {
        GetCity(countryid, stateid).then(result => {
            setCityList(result);
        });
    }, [countryid, stateid]);

    useEffect(() => {
        const fetchConversion = async () => {
            try {
                if (currency) {
                    const value = await Convert(total).from("NGN").to(currency);
                    setConvertedValue(value);
                }
            } catch (error) {
                console.error("Error converting value:", error);
            }
        };
        fetchConversion();
    }, [currency, total]);

    const fetchAPI = async (url, options) => {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(
                `Failed request: ${response.status} ${response.statusText}`
            );
        }
        return await response.json();
    };

    const createParcel = async ({ description, items, weightUnit = "kg" }) => {
        const url = "https://api.terminal.africa/v1/shipments";
        const body = { description, items, weight_unit: weightUnit };
        const options = {
            method: "POST",
            headers: {
                Authorization: `Bearer sk_live_DKI2NDNaCNkCehzTY5yZJKDA1qPJPCCe`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        };

        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(
                    `Failed to get parcels: ${response.status} ${response.statusText}`
                );
            }

            const data = await response.json();
            console.log("parcels", data);
            return data.data;
        } catch (error) {
            console.error("Error creating parcels:", error);
            throw error;
        }
    };

    const getShippingQuotes = async ({
        pickupAddress,
        deliveryAddress,
        parcel,
        currency = { currency },
        cashOnDelivery = false
    }) => {
        const url = "https://api.terminal.africa/v1/rates/shipment/quotes";
        const body = {
            pickup_address: pickupAddress,
            delivery_address: deliveryAddress,
            //parcel,
            currency,
            cash_on_delivery: cashOnDelivery
        };
        const options = {
            method: "POST",
            headers: {
                Authorization: `Bearer   sk_live_DKI2NDNaCNkCehzTY5yZJKDA1qPJPCCe`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        };

        /*try {
            const data = await fetchAPI(url, options);
            console.log("shipping quotes", data);
            return data.data;
        } catch (error) {
            console.error("Error retrieving quotes:", error);
            throw error;
        }*/
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(
                    `Failed to get shipping quotes: ${response.status} ${response.statusText}`
                );
            }

            const data = await response.json();
            console.log("shipping quotes", data);
            return data.data;
        } catch (error) {
            console.error("Error getting shipping quotes", error);
            throw error;
        }
    };

    const handleCreateParcelAndGetQuotes = async (
        countryIsoCode,
        selectedCity,
        selectedState
    ) => {
        try {
            if (selectedState && selectedCity && countryIsoCode) {
                const newParcel = await createParcel({
                    description: "A shipment of electronic items",
                    items: [
                        {
                            description: "Smartphone",
                            name: "iPhone 12",
                            currency: "USD",
                            value: 799,
                            weight: 0.5,
                            quantity: 2
                        }
                    ]
                });

                setParcel(newParcel);

                const shippingQuotes = await getShippingQuotes({
                    pickupAddress: {
                        city: "Ibadan",
                        state: "Oyo",
                        country: "NG"
                    },
                    deliveryAddress: {
                        city: selectedCity,
                        state: selectedState,
                        country: countryIsoCode
                    },
                    parcel: newParcel
                });

                setQuotes(shippingQuotes);
            } else {
                console.warn(
                    "State, city, or country ISO code is missing:",
                    selectedState,
                    selectedCity,
                    countryIsoCode
                );
            }
        } catch (error) {
            console.error("Error in handleCreateParcelAndGetQuotes:", error);
        }
    };

    const handleCountryChange = e => {
        setCountryid(e.id);
        setCountryIsoCode(e.iso2);
        setSelectedCountry(e.name);
        setCurrencysymbol(e.currency_symbol);
        setCurrency(e.currency);
        console.log(e.id);
    };

    const handleStateChange = e => {
        setSelectedState(e.name);
        setstateid(e.id);
        console.log(e.name, e.id);
    };

    const handleCityChange = e => {
        setSelectedCity(e.name);
        console.log("selected city", e);
    };

    const handleCalculateQuotes = async () => {
        await handleCreateParcelAndGetQuotes(
            countryIsoCode,
            selectedCity,
            selectedState
        );
    };

    const [parcel, setParcel] = useState(null);
    const [quotes, setQuotes] = useState([]);
    console.log(quotes, "quotes");

    const TSHIP_API_SECRET_KEY = "sk_live_DKI2NDNaCNkCehzTY5yZJKDA1qPJPCCe";

    return (
        <>
            <form className="">
                <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
                    <a href="#" className="text-2xl font-bold text-gray-800">
                        Foodei
                    </a>
                    <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
                        <div className="relative">
                            <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
                                <li className="flex items-center space-x-3 text-left sm:space-x-4">
                                    <a
                                        className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700"
                                        href="#"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                    </a>
                                    <span className="font-semibold text-gray-900">
                                        Shop
                                    </span>
                                </li>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                                <li className="flex items-center space-x-3 text-left sm:space-x-4">
                                    <a
                                        className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2"
                                        href="#"
                                    >
                                        2
                                    </a>
                                    <span className="font-semibold text-gray-900">
                                        Shipping
                                    </span>
                                </li>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                                <li className="flex items-center space-x-3 text-left sm:space-x-4">
                                    <a
                                        className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white"
                                        href="#"
                                    >
                                        3
                                    </a>
                                    <span className="font-semibold text-gray-500">
                                        Payment
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
                    <div className="px-4 pt-8">
                        <p className="text-xl font-medium">Order Summary</p>
                        <p className="text-gray-400">
                            Check your items. And select a suitable shipping
                            method.
                        </p>
                        <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
                            <div className="flex flex-col rounded-lg bg-white sm:flex-row">
                                <img
                                    className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                                    src={product.productImg}
                                    alt=""
                                />
                                <div className="flex w-full flex-col px-4 py-4">
                                    <span className="font-semibold">
                                        {product.productName}
                                    </span>
                                    <span className="float-right text-gray-400">
                                        Min order: {product.minOrder}
                                    </span>
                                    <p className="text-lg font-bold">
                                        &#8358; {product.pricePerGram} / Gram
                                    </p>
                                    <div className="mt-4">
                                        <label
                                            htmlFor="quantity"
                                            className="block text-sm font-medium text-gray-900"
                                        >
                                            Quantity (grams):
                                        </label>
                                        <input
                                            type="number"
                                            id="quantity"
                                            name="quantity"
                                            min={minOrder}
                                            value={quantity}
                                            onChange={e =>
                                                setQuantity(
                                                    Number(e.target.value)
                                                )
                                            }
                                            className="mt-1 w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <p className="mt-8 text-lg font-medium">
                            Shipping Methods
                        </p>
                        <div className="mt-5 grid gap-6">
                            <div className="relative">
                                <input
                                    className="peer hidden"
                                    id="radio_1"
                                    type="radio"
                                    name="radio"
                                    readOnly
                                    checked
                                />
                                <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                                <label
                                    className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                                    htmlFor="radio_1"
                                >
                                    <img
                                        className="w-14 object-contain"
                                        src="/images/naorrAeygcJzX0SyNI4Y0.png"
                                        alt=""
                                    />
                                    <div className="ml-5">
                                        <span className="mt-2 font-semibold">
                                            Fedex Delivery
                                        </span>
                                        <p className="text-slate-500 text-sm leading-6">
                                            Delivery: 2-4 Days
                                        </p>
                                    </div>
                                </label>
                            </div>
                            <div className="relative">
                                <input
                                    className="peer hidden"
                                    id="radio_2"
                                    type="radio"
                                    name="radio"
                                    readOnly
                                    checked
                                />
                                <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                                <label
                                    className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg peer-checked:border-gray-700 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                                    htmlFor="radio_2"
                                >
                                    <img
                                        className="w-14 object-contain"
                                        src="/images/oG8xsl3xsOkwkMsrLGKM4.png"
                                        alt=""
                                    />
                                    <div className="ml-5">
                                        <span className="mt-2 font-semibold">
                                            Fedex Delivery
                                        </span>
                                        <p className="text-slate-500 text-sm leading-6">
                                            Delivery: 2-4 Days
                                        </p>
                                    </div>
                                </label>
                            </div>

                            <Button
                                className="mt-3 w-full rounded-md bg-blue-500 px-4 py-2 text-white"
                                onClick={handleCalculateQuotes}
                            >
                                Calculate Shipping Quote
                            </Button>
                        </div>
                    </div>
                    <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
                        <div className="">
                            <label
                                htmlFor="billing-address"
                                className="mt-4 mb-4 block text-lg font-bold font-kanit text-amber-800 "
                            >
                                Billing Address
                            </label>

                            <div>
                                <Typography className="text-sm font-medium mb-1">
                                    Country
                                </Typography>

                                <CountrySelect
                                    onChange={e => handleCountryChange(e)}
                                    placeHolder="Select Country"
                                />
                            </div>
                            <div>
                                <Typography className="text-sm font-medium mb-1">
                                    State
                                </Typography>
                                <StateSelect
                                    countryid={countryid}
                                    onChange={e => handleStateChange(e)}
                                    placeHolder="Select State"
                                />
                            </div>
                            <Typography className="text-sm font-medium mb-1">
                                City
                            </Typography>
                            <div>
                                <CitySelect
                                    countryid={countryid}
                                    stateid={stateid}
                                    onChange={e => handleCityChange(e)}
                                    placeHolder="Select City"
                                />
                            </div>
                            <div>
                                <select
                                    onChange={e => {
                                        const city = cityList[e.target.value]; // here you will get the full city object.
                                        setCityid(city.id);
                                    }}
                                    value={cityid}
                                >
                                    {cityList &&
                                        cityList.map((item, index) => (
                                            <option key={index} value={index}>
                                                {item.name}
                                            </option>
                                        ))}
                                </select>
                            </div>

                            <div className="flex flex-col sm:flex-row">
                                <div className="relative flex-shrink-0 sm:w-7/12 mt-3">
                                    <Typography className="text-sm font-medium mb-1">
                                        Your Address
                                    </Typography>
                                    <input
                                        type="text"
                                        id="billing-address"
                                        name="billing-address"
                                        className="w-full rounded-md border border-gray-200 py-3 px-4 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                                        placeholder="Street Address"
                                    />
                                </div>
                                <Typography className="text-sm font-medium mt-3">
                                    Country Zip code
                                </Typography>
                                <input
                                    type="text"
                                    name="billing-zip"
                                    className="flex-shrink-0 rounded-md border border-gray-200 mt-1 px-4 py-3 text-sm shadow-sm outline-none sm:w-1/6 focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                                    placeholder="ZIP"
                                />
                            </div>
                            <div className="mt-6 border-t border-b py-2">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium text-gray-900">
                                        Subtotal
                                    </p>
                                    <p className="font-semibold text-gray-900">
                                        &#8358; {subtotal.toFixed(2)}
                                    </p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium text-gray-900">
                                        Shipping
                                    </p>
                                    <p className="font-semibold text-gray-900">
                                        &#8358; {shippingCost.toFixed(2)}
                                    </p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium text-gray-900">
                                        Total
                                    </p>
                                    <p className="font-semibold text-gray-900">
                                        &#8358; {total.toFixed(2)} /{" "}
                                        {currencysymbol}{" "}
                                        {convertedValue.toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <Button
                            size="lg"
                            className="mt-6 mb-6 w-full rounded-md bg-amber-800 px-4 py-2 text-white"
                        >
                            {" "}
                            Continue{" "}
                        </Button>
                    </div>
                </div>
            </form>
        </>
    );
}
