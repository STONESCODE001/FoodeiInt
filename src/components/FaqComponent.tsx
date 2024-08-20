import React from "react";

import {
    Button,
    Typography,
    Accordion,
    AccordionHeader,
    AccordionBody
} from "@material-tailwind/react";
import { CalendarDaysIcon, HandRaisedIcon } from "@heroicons/react/24/outline";

const faqcontents = [
    {
        header: "How can I track my order?",
        content:
            "Buyers receive a tracking number once their order is shipped, allowing them to monitor its status and location until delivery."
    },
    {
        header: "What if I'm not satisfied with my purchase?",
        content:
            "If buyers are not satisfied with their purchase, they can contact us directly to utilize our buyer protection program for refunds or replacements."
    },
    {
        header: "How can I trust the quality of products purchased from sellers on this platform?",
        content:
            "We carefully vet all sellers before they list their products, making sure they are fully registered in their home country and we handle all shipping, ensuring secure and timely deliveries in accordance to every countries importations laws on food items & produces "
    },
    {
        header: "How do I register as a seller on the platform?",
        content:
            "As a seller you can register by filling out the registration form accompanied with necessary documents and upon approval, you can start listing your produces."
    },
    {
        header: "How does the payment process work for sellers?",
        content:
            "Once a buyer receives their order and approves that the produce is of right quality, the payment is securely processed, and sellers receive payment directly to their registered account."
    },
    {
        header: "What are the benefits of selling on this platform?",
        content:
            "Selling on our platform provides access to a global market and simplified selling processes. We handle all shipping to buyers, ensuring a hassle-free experience."
    }
];

export default function Faq() {
    const [open, setOpen] = React.useState(1);

    const handleOpen = value => setOpen(open === value ? 0 : value);

    return (
        <>
            <div className="container p-7 md:px-16  my-6 ">
                <Typography className="font-kanit mb-6 text-md font-black ">
                    Frequently Asked Questions
                </Typography>

                {faqcontents.map((faq, index) => (
                    <Accordion key={index} open={open === index + 1}>
                        <AccordionHeader
                            className="font-kanit font-bold text-md hover:text-orange-700"
                            onClick={() => handleOpen(index + 1)}
                        >
                            {faq.header}
                        </AccordionHeader>
                        <AccordionBody className=" text-md text-normal">
                            {faq.content}
                        </AccordionBody>
                    </Accordion>
                ))}
            </div>
        </>
    );
}
