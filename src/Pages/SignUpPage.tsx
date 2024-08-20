import React, { useState, useRef, useEffect } from "react";
import {
    Typography,
    Input,
    Button,
    Radio,
    Alert,
    Spinner
} from "@material-tailwind/react";
import {
    EyeSlashIcon,
    EyeIcon,
    CheckIcon,
    InformationCircleIcon
} from "@heroicons/react/24/solid";

import { Outlet, Link, useNavigate } from "react-router-dom";
import { auth, db } from "../FirebaseFiles/firebaseconfig.tsx";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";

export function SignUpPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: " ",
        lastName: "",
        bizName: "",
        email: "",
        password: "",
        userType: "Buyer"
    });
    const [errors, setErrors] = useState({});
    const [alertMessage, setAlertMessage] = useState("");
    const [alertVisible, setAlertVisible] = useState(false);
    const [isLoading, setLoading] = useState<boolean>(false);

    const validate = () => {
        let tempErrors = {};
        if (!formData.bizName) tempErrors.bizName = "Business Name is required";
        if (!formData.email) tempErrors.email = "Email is required";
        if (!formData.firstName) tempErrors.email = "FirstName is required";
        if (!formData.lastName) tempErrors.email = "LastName is required";
        if (!formData.phoneNum) tempErrors.email = "PhoneNumber is required";
        if (!formData.password) tempErrors.password = "Password is required";
        if (formData.password.length < 7)
            tempErrors.password = "Password should be over 7 characters";

        setErrors(tempErrors);
        if (Object.keys(tempErrors).length > 0) {
            setAlertMessage(Object.values(tempErrors).join(",  "));
            setAlertVisible(true);
            setLoading(false);
        } else {
            setAlertVisible(false);
        }

        return Object.keys(tempErrors).length === 0;
    };

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async event => {
        setLoading(true);
        event.preventDefault();
        if (validate()) {
            console.log("Form data submitted:", formData);
            const firstName = formData.firstName;
            const lastName = formData.lastName;
            const phoneNumber = formData.phoneNum;
            const email = formData.email;
            const password = formData.password;
            const bizName = formData.bizName;
            const accType = formData.userType;
            const timestamp = new Date();

            await createUserWithEmailAndPassword(
                auth,
                email,
                password,
                firstName,
                lastName,
                phoneNumber,
                bizName,
                accType,
                timestamp
            )
                .then(async userCredential => {
                    // Signed up
                    const user = userCredential.user;
                    const uid = user.uid;
                    // ...
                    console.log(user, "userSigned Up");
                    await writeToFirestore(
                        uid,
                        bizName,
                        firstName,
                        lastName,
                        phoneNumber,
                        email,
                        timestamp,
                        accType
                    );
                })
                .catch(error => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrors(errorMessage);
                    setAlertVisible(true);
                    setLoading(true);
                });
        }
    };

    async function writeToFirestore(
        uid,
        bizName,
        firstName,
        lastName,
        phoneNumber,
        email,
        timestamp,
        accType
    ) {
        try {
            const docRef = await addDoc(collection(db, "Users"), {
                uid: uid,
                firstName: firstName,
                lastName: lastName,
                phoneNumber: phoneNumber,
                businessName: bizName,
                email: email,
                creationdate: timestamp,
                accountType: accType
            });
            setLoading(false);
            navigate("/SignIn");
        } catch (e) {
            setErrors(e);
            setAlertMessage(Object.values(e).join(""));
            setAlertVisible(true);
            setLoading(false);
        }
    }

    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => setPasswordShown(cur => !cur);

    return (
        <>
            <section className="grid text-center h-screen items-center p-8">
                <div>
                    <Typography
                        variant="h3"
                        color="blue-gray"
                        className="mb-2 font-kanit font-bold"
                    >
                        Welcome to Foodei.
                    </Typography>
                    <Typography className="mb-16 text-gray-600 font-normal text-[18px]">
                        Register Now for a Free Account
                    </Typography>
                    {alertVisible && (
                        <Alert
                            color="red"
                            icon={<InformationCircleIcon />}
                            onClose={() => setAlertVisible(false)}
                            className="mb-6 "
                        >
                            {alertMessage}
                        </Alert>
                    )}
                    <form
                        onSubmit={handleSubmit}
                        className="mx-auto max-w-[24rem] text-left"
                    >
                        <div className=" md:flex flex-col items-center justify-center h-auto mb-5">
                            <div className="w-full mb-5 ">
                                <label htmlFor="firstName">
                                    <Typography
                                        variant="small"
                                        className="mb-2 block font-medium text-gray-900 font-kanit"
                                    >
                                        First Name
                                    </Typography>
                                </label>
                                <Input
                                    id="firstName"
                                    color="gray"
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    placeholder="Micheal"
                                    className=" placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200 "
                                    labelProps={{
                                        className: "hidden"
                                    }}
                                />
                            </div>
                            <div className="w-full mb-5 ">
                                <label htmlFor="lastName">
                                    <Typography
                                        variant="small"
                                        className="mb-2 block font-medium text-gray-900 font-kanit"
                                    >
                                        Last Name
                                    </Typography>
                                </label>
                                <Input
                                    id="lastName"
                                    color="gray"
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    placeholder="Jackson"
                                    className=" placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                                    labelProps={{
                                        className: "hidden"
                                    }}
                                />
                            </div>
                        </div>

                        <div className="mb-6">
                            <label htmlFor="email">
                                <Typography
                                    variant="small"
                                    className="mb-2 block font-medium text-gray-900 font-kanit"
                                >
                                    Your Email
                                </Typography>
                            </label>
                            <Input
                                id="email"
                                color="gray"
                                size="lg"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="name@mail.com"
                                className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                                labelProps={{
                                    className: "hidden"
                                }}
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="bizName">
                                <Typography
                                    variant="small"
                                    className="mb-2 block font-medium text-gray-900 font-kanit"
                                >
                                    Your Business Name
                                </Typography>
                            </label>
                            <Input
                                id="bizName"
                                color="gray"
                                size="lg"
                                type="text"
                                name="bizName"
                                value={formData.bizName}
                                onChange={handleChange}
                                placeholder="either registered or not"
                                className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                                labelProps={{
                                    className: "hidden"
                                }}
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="phoneNum">
                                <Typography
                                    variant="small"
                                    className="mb-2 block font-medium text-gray-900 font-kanit"
                                >
                                    Your Phone Number
                                </Typography>
                            </label>
                            <Input
                                id="phoneNum"
                                color="gray"
                                size="lg"
                                type="number"
                                name="phoneNum"
                                value={formData.phoneNum}
                                onChange={handleChange}
                                placeholder="this is mainly only for shipping purposes"
                                className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                                labelProps={{
                                    className: "hidden"
                                }}
                            />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="password">
                                <Typography
                                    variant="small"
                                    className="mb-2 block font-medium text-gray-900 font-kanit"
                                >
                                    Password
                                </Typography>
                            </label>
                            <Input
                                id="password"
                                size="lg"
                                name="password"
                                placeholder="********"
                                value={formData.password}
                                onChange={handleChange}
                                labelProps={{
                                    className: "hidden"
                                }}
                                className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                                type={passwordShown ? "text" : "password"}
                                icon={
                                    <i onClick={togglePasswordVisiblity}>
                                        {passwordShown ? (
                                            <EyeIcon className="h-5 w-5" />
                                        ) : (
                                            <EyeSlashIcon className="h-5 w-5" />
                                        )}
                                    </i>
                                }
                            />
                        </div>

                        <div className="flex flex-col gap-8 mb-3">
                            <Radio
                                id="seller"
                                name="userType"
                                value="Seller"
                                checked={formData.userType === "Seller"}
                                onChange={handleChange}
                                label={
                                    <div>
                                        <Typography
                                            color="blue-gray"
                                            className="font-medium"
                                        >
                                            Seller
                                        </Typography>
                                        <Typography
                                            variant="small"
                                            color="gray"
                                            className="font-normal"
                                        >
                                            For those signing up as seller
                                        </Typography>
                                    </div>
                                }
                                containerProps={{
                                    className: "-mt-5"
                                }}
                            />
                            <Radio
                                id="buyer"
                                name="userType"
                                value="Buyer"
                                checked={formData.userType === "Buyer"}
                                onChange={handleChange}
                                label={
                                    <div>
                                        <Typography
                                            color="blue-gray"
                                            className="font-medium"
                                        >
                                            Buyer
                                        </Typography>
                                        <Typography
                                            variant="small"
                                            color="gray"
                                            className="font-normal"
                                        >
                                            For those signing up as a Buyer
                                        </Typography>
                                    </div>
                                }
                                containerProps={{
                                    className: "-mt-5"
                                }}
                            />
                        </div>

                        <Button
                            type="submit"
                            size="lg"
                            className="mt-6 bg-orange-700"
                            disabled={isLoading}
                            fullWidth
                        >
                            {isLoading ? "Signing You Up ...." : "Sign Up"}
                        </Button>

                        <Typography
                            variant="small"
                            color="gray"
                            className="!mt-4 text-center text-sm font-normal "
                        >
                            If you are registered{" "}
                            <Link
                                to="/SignIn"
                                className="font-medium text-black"
                            >
                                Sign In to your account
                            </Link>
                        </Typography>
                        <div className="!mt-4 flex justify-center">
                            <Typography
                                as="a"
                                href="#"
                                color="blue-gray"
                                variant="small"
                                className="text-sm text-center font-medium"
                            >
                                Forgot password
                            </Typography>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
}

export default SignUpPage;
