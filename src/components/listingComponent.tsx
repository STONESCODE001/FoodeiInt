import React, { useState, useEffect } from "react";
import {
    Typography,
    Card,
    CardBody,
    CardHeader,
    CardFooter,
    Button,
    Input,
    Alert
} from "@material-tailwind/react";
import { collection, addDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../FirebaseFiles/firebaseconfig";
import { useAuth } from "../contexts/AuthContexts";
import ImgUploader from "../components/imgUploaderComponent.tsx";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import NaijaStates from "naija-state-local-government";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../FirebaseFiles/firebaseconfig.tsx";

export const ListingComponent = () => {
    const { user } = useAuth();
    const [states, setStates] = useState([]);
    const [localGovernments, setLocalGovernments] = useState([]);
    const [selectedLga, setSelectedLga] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [images, setImages] = useState([]);
    const [errors, setErrors] = useState({});
    const [alertMessage, setAlertMessage] = useState("");
    const [alertVisible, setAlertVisible] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setStates(NaijaStates.states());
    }, []);

    useEffect(() => {
        if (selectedState) {
            const data = NaijaStates.lgas(selectedState);
            setLocalGovernments(Array.isArray(data.lgas) ? data.lgas : []);
        } else {
            setLocalGovernments([]);
        }
    }, [selectedState]);

    const [formData, setFormData] = useState({
        productName: "",
        productPrice: "",
        minOrderQty: "",
        phoneNumber: "",
        descriptionMsg: ""
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleLgaChange = e => {
        setSelectedLga(e.target.value);
    };

    const validate = () => {
        let tempErrors = {};

        if (!formData.productName.trim())
            tempErrors.productName = "Product Name is required";

        if (!formData.minOrderQty.trim())
            tempErrors.minOrderQty = "Minimum Order Quantity is required";

        if (!formData.productPrice.trim())
            tempErrors.productPrice = "Product Price per Gram is required";

        if (!formData.phoneNumber.trim())
            tempErrors.phoneNumber = "Phone Number is required";
        else if (formData.phoneNumber.length !== 11)
            tempErrors.phoneNumber = "Number should only be 11 digits";

        if (!formData.descriptionMsg.trim())
            tempErrors.descriptionMsg = "Description is required";

        if (formData.descriptionMsg.length > 250)
            tempErrors.descriptionMsg =
                "Description should only contain 250 characters ";

        if (images.length === 0)
            tempErrors.images = "At least one image is required";

        setErrors(tempErrors);

        if (Object.keys(tempErrors).length > 0) {
            setAlertMessage(Object.values(tempErrors).join(", "));
            setAlertVisible(true);
            setLoading(false);
            return false;
        } else {
            setAlertVisible(false);
            return true;
        }
    };

    /* const handleSubmit = async event => {
        event.preventDefault();
        setLoading(true);

        if (validate()) {
            try {
                // Image upload logic
                const uploadedImages = await Promise.all(
                    images.map(async image => {
                        const storageRef = ref(
                            storage,
                            `images/${image.file.name}`
                        );
                        await uploadBytes(storageRef, image.file);
                        const url = await getDownloadURL(storageRef);
                        return url;
                    })
                );

                // Data submission to Firestore
                await addDoc(collection(db, "listings"), {
                    ...formData,
                    state: selectedState,
                    lga: selectedLga,
                    images: uploadedImages,
                    userId: user.uid
                });

                setAlertMessage("Listing created successfully!");
                setAlertVisible(true);
                setFormData({
                    productName: "",
                    productPrice: "",
                    minOrderQty: "",
                    phoneNumber: "",
                    descriptionMsg: ""
                });
                setImages([]);
                setSelectedState("");
                setSelectedLga("");
                //navigate("/success-page"); // Redirect to a success page
            } catch (error) {
                setAlertMessage("Error creating listing: " + error.message);
                setAlertVisible(true);
            } finally {
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    };*/

    const handleSubmit = async event => {
        event.preventDefault();
        setLoading(true);

        if (validate()) {
            try {
                // Image upload logic
                const uploadedImages = await Promise.all(
                    images.map(async image => {
                        const storageRef = ref(
                            storage,
                            `images/${image.file.name}`
                        );
                        await uploadBytes(storageRef, image.file);
                        const url = await getDownloadURL(storageRef);
                        return url;
                    })
                );

                // Data submission to Firestore

                const docRef = await addDoc(collection(db, "Catalog"), {
                    ...formData,
                    state: selectedState,
                    lga: selectedLga,
                    images: uploadedImages
                    //userId: user.uid
                });

                await updateDoc(docRef, { id: docRef.id });

                setAlertMessage("Listing created successfully!");
                setAlertVisible(true);

                // Reset the form
                setFormData({
                    productName: "",
                    productPrice: "",
                    minOrderQty: "",
                    phoneNumber: "",
                    descriptionMsg: ""
                });
                setImages([]);
                setSelectedState("");
                setSelectedLga("");
                //navigate("/success-page"); // Redirect to a success page
            } catch (error) {
                console.error("Error creating listing:", error);
                setAlertMessage("Error creating listing: " + error.message);
                setAlertVisible(true);
            } finally {
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="px-6 py-1">
                {alertVisible && (
                    <Alert
                        color="red"
                        icon={<InformationCircleIcon />}
                        onClose={() => setAlertVisible(false)}
                        className="mb-6"
                    >
                        {alertMessage}
                    </Alert>
                )}
            </div>
            <form onSubmit={handleSubmit}>
                <div className="m-3 p-4">
                    <Card className="">
                        <div className="border-2 border-black h-auto w-full rounded-2xl top-1/2">
                            <CardHeader className="bg-transparent shadow-none mx-auto my-auto text-center flex justify-center top-1/2 p-3">
                                <ImgUploader setImages={setImages} />
                            </CardHeader>
                        </div>
                        <CardBody className="text-left">
                            <label htmlFor="productName">
                                <Typography
                                    variant="small"
                                    className="mb-1 block font-medium text-gray-900 font-kanit"
                                >
                                    Product Name
                                </Typography>
                            </label>
                            <Input
                                id="productName"
                                color="gray"
                                size="lg"
                                type="text"
                                name="productName"
                                placeholder="Should be simple and precise"
                                value={formData.productName}
                                onChange={handleChange}
                                className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                                labelProps={{ className: "hidden" }}
                            />
                            <label htmlFor="productPrice">
                                <Typography
                                    variant="small"
                                    className="mb-1 mt-4 block font-medium text-gray-900 font-kanit"
                                >
                                    Price per Kg ( &#8358;)
                                </Typography>
                            </label>
                            <Input
                                id="productPrice"
                                color="gray"
                                size="lg"
                                type="number"
                                name="productPrice"
                                value={formData.productPrice}
                                onChange={handleChange}
                                placeholder="This Should be in &#8358; price per kilogram"
                                className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200 mb-3"
                                labelProps={{ className: "hidden" }}
                            />
                            <label htmlFor="minOrderQty">
                                <Typography
                                    variant="small"
                                    className="mb-1 mt-4 block font-medium text-gray-900 font-kanit"
                                >
                                    Minimum Order Quantity (KG)
                                </Typography>
                            </label>
                            <Input
                                id="minOrderQty"
                                color="gray"
                                size="lg"
                                type="number"
                                name="minOrderQty"
                                placeholder="Lowest Quantity that you sell in Kg"
                                value={formData.minOrderQty}
                                onChange={handleChange}
                                className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                                labelProps={{ className: "hidden" }}
                            />
                            <label htmlFor="phoneNumber">
                                <Typography
                                    variant="small"
                                    className="mb-1 mt-4 block font-medium text-gray-900 font-kanit"
                                >
                                    Phone Number
                                </Typography>
                            </label>
                            <Input
                                id="phoneNumber"
                                color="gray"
                                size="lg"
                                type="tel"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                placeholder="Enter phone number"
                                className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200 mb-3"
                                maxLength={11}
                                labelProps={{ className: "hidden" }}
                            />
                            <div className="mb-5">
                                <label htmlFor="descriptionMsg">
                                    <Typography
                                        variant="small"
                                        className="mb-1 mt-4 block font-medium text-gray-900 font-kanit"
                                    >
                                        Description + Ingredients
                                    </Typography>
                                </label>
                                <textarea
                                    id="descriptionMsg"
                                    name="descriptionMsg"
                                    value={formData.descriptionMsg}
                                    onChange={handleChange}
                                    maxLength={250}
                                    className="w-full p-2 border rounded-lg"
                                    placeholder="Enter ingredients (max 250 characters)"
                                />
                                <Typography
                                    variant="small"
                                    className="block font-medium text-gray-900 font-kanit"
                                >
                                    {formData.descriptionMsg.length}/250
                                    characters
                                </Typography>
                            </div>
                            <div className="w-full">
                                <div className=" ">
                                    <Typography
                                        variant="small"
                                        className="mb-2 mt-2 block font-medium text-gray-900 font-kanit"
                                    >
                                        Produce Origin State
                                    </Typography>
                                    <select
                                        id="states"
                                        onChange={e =>
                                            setSelectedState(e.target.value)
                                        }
                                        value={selectedState}
                                    >
                                        <option value="">
                                            --Select State--
                                        </option>
                                        {states.map(state => (
                                            <option key={state} value={state}>
                                                {state}
                                            </option>
                                        ))}
                                    </select>
                                    {selectedState && (
                                        <div>
                                            <Typography
                                                variant="small"
                                                className="mb-2 mt-2 block font-medium text-gray-900 font-kanit"
                                            >
                                                Local Government
                                            </Typography>
                                            <select
                                                id="local-governments"
                                                onChange={handleLgaChange}
                                                value={selectedLga}
                                            >
                                                <option value="">
                                                    --Select Local Government--
                                                </option>
                                                {localGovernments.map(lga => (
                                                    <option
                                                        key={lga}
                                                        value={lga}
                                                    >
                                                        {lga}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </CardBody>
                        <CardFooter>
                            <Button
                                type="submit"
                                size="lg"
                                className="mt-6 bg-orange-700"
                                disabled={isLoading}
                                fullWidth
                            >
                                {isLoading ? "Listing ...." : "List Produce"}
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </form>
        </>
    );
};
