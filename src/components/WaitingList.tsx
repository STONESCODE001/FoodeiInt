import React, { useState } from "react";
import { Typography, Card } from "@material-tailwind/react";
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    DialogTitle
} from "@headlessui/react";
import {
    ExclamationTriangleIcon,
    CheckCircleIcon
} from "@heroicons/react/24/solid";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../FirebaseFiles/firebaseconfig.tsx";

export default function WaitingListComponent() {
    const [email, setEmail] = useState("");
    const [isLoading, setLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<string | null>(null);
    const [open, setOpen] = useState(false);

    const pushEmail = async (event: React.FormEvent) => {
        setLoading(true);
        event.preventDefault();
        if (!email) {
            setErrors("Kindly fill the email form");
            setLoading(false);
            return;
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setErrors("Invalid email format");
            setLoading(false);
            return;
        }

        try {
            await addDoc(collection(db, "waitinglist"), {
                email: email
            });
            setLoading(false);
            setOpen(true); // Open the dialog
        } catch (e) {
            setErrors("Error submitting your email. Please try again later.");
            setLoading(false);
        }
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        if (errors) setErrors(null); // Clear errors on input change
    };

    return (
        <>
            <div className="p-7">
                <Card className="bg-orange-900 py-9 px-4">
                    <Typography className="text-3xl font-black font-kanit text-white p-2">
                        Get notified when we launch
                    </Typography>

                    <Typography
                        variant="h6"
                        className="px-2 font-bold text-gray-200"
                    >
                        Join the waitlist! Be the first to hear from us.
                    </Typography>
                    <small id="email-help" className="text-gray-300 mt-1 px-2">
                        We'll never share your email.
                    </small>

                    <div className="mt-6 flex max-w-md gap-x-4">
                        <label htmlFor="email-address" className="sr-only">
                            Email address
                        </label>
                        <input
                            id="email-address"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={handleEmailChange}
                            className="min-w-0 flex-auto rounded-md border-0 bg-white px-3.5 py-2 text-black shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                            placeholder="Enter your email"
                        />

                        <button
                            type="submit"
                            onClick={pushEmail}
                            className="flex-none rounded-md bg-white px-3.5 py-2.5 text-sm font-black text-black font-kanit shadow-sm hover:bg-green-700 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                            disabled={isLoading}
                        >
                            {isLoading ? "Submitting..." : "Submit!"}
                        </button>
                    </div>

                    {errors && (
                        <div className="error font-black w-full text-sm mt-2 bg-white text-red-500 p-2 border border-white">
                            {errors}
                        </div>
                    )}
                </Card>
            </div>

            {/* Conditional Dialog Rendering */}
            {open && (
                <Dialog
                    open={open}
                    onClose={() => setOpen(false)}
                    className="relative z-10"
                >
                    <DialogBackdrop
                        transition
                        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                    />

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <DialogPanel
                                transition
                                className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
                            >
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                                            <CheckCircleIcon
                                                aria-hidden="true"
                                                className="h-6 w-6 text-green-600"
                                            />
                                        </div>
                                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                            <DialogTitle
                                                as="h3"
                                                className="text-base font-semibold leading-6 text-gray-900 font-kanit"
                                            >
                                                Thank You for Signing Up!
                                            </DialogTitle>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">
                                                    Thank You for Joining the
                                                    Wait-list! We’re excited to
                                                    have you with us. Your
                                                    support means a lot to us.
                                                    Stay tuned for updates as we
                                                    get closer to launch!
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button
                                        type="button"
                                        onClick={() => setOpen(false)}
                                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                                    >
                                        Have Questions? Email Us
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setOpen(false)}
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                    >
                                        Close
                                    </button>
                                </div>
                            </DialogPanel>
                        </div>
                    </div>
                </Dialog>
            )}
        </>
    );
}

