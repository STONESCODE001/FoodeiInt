import { useState } from "react";
import { Typography, Input, Button, Alert } from "@material-tailwind/react";
import {
    EyeSlashIcon,
    EyeIcon,
    CheckIcon,
    InformationCircleIcon
} from "@heroicons/react/24/solid";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { auth, db } from "../FirebaseFiles/firebaseconfig.tsx";
import { signInWithEmailAndPassword } from "firebase/auth";

export function SignInPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [errors, setErrors] = useState({});
    const [alertMessage, setAlertMessage] = useState("");
    const [alertVisible, setAlertVisible] = useState(false);
    const [isLoading, setLoading] = useState<boolean>(false);

    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => setPasswordShown(cur => !cur);

    const validate = () => {
        let tempErrors = {};
        if (!formData.email) tempErrors.email = "Email is required";
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

    function handleSignIn() {
        setLoading(true);
        event.preventDefault();
        if (validate()) {
            console.log(formData);
            const email = formData.email;
            const password = formData.password;
            signInWithEmailAndPassword(auth, email, password)
                .then(userCredential => {
                    // Signed in
                    const user = userCredential.user;
                    // ...
                    setLoading(false);
                    console.log("user signed in");
                    navigate("/");
                })
                .catch(error => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrors(errorMessage);
                    setAlertMessage(Object.values(errorMessage).join(""));
                    setAlertVisible(true);
                    setLoading(false);
                });
        }
    };

    return (
        <section className="grid text-center h-screen items-center p-8">
            <div>
                <Typography
                    variant="h3"
                    color="blue-gray"
                    className="mb-2 font-kanit font-bold"
                >
                    Welcome Back.
                </Typography>
                <Typography className="mb-16 text-gray-600 font-normal text-[18px]">
                    Enter your email and password to sign in
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
                    onSubmit={handleSignIn}
                    className="mx-auto max-w-[24rem] text-left"
                >
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
                            placeholder="name@mail.com"
                            value={formData.email}
                            onChange={handleChange}
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
                    <Button
                        type="submit"
                        size="lg"
                        className="mt-6 bg-orange-700"
                        disabled={isLoading}
                        fullWidth
                    >
                        {isLoading ? "Signing You In ...." : "Sign In"}
                    </Button>

                    <Typography
                        variant="small"
                        color="gray"
                        className="!mt-4 text-center font-normal"
                    >
                        Not registered?{" "}
                        <Link
                            to="/SignUp"
                            className="font-medium text-gray-900"
                        >
                            Create account
                        </Link>
                    </Typography>
                    <div className="!mt-4 flex justify-center">
                        <Typography
                            as="a"
                            href="#"
                            color="blue-gray"
                            variant="small"
                            className="font-medium"
                        >
                            Forgot password
                        </Typography>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default SignInPage;
