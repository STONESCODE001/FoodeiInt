import { Typography } from "@material-tailwind/react";

const SITEMAP = [
    {
        title: "Company",
        links: ["About Us"]
    },
    {
        title: "Help Center",
        links: ["Chat With Us", "Email Us"]
    },
    {
        title: "Navigation",
        links: ["Home"]
    }
];

const currentYear = new Date().getFullYear();

export default function FooterComponent() {
    return (
        <footer className="relative w-full">
            <div className="mx-auto w-full max-w-7xl px-8">
                <div className="mx-auto grid w-full grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-4">
                    {SITEMAP.map(({ title, links }, key) => (
                        <div key={key} className="w-full">
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="mb-4 font-bold uppercase opacity-50 font-kanit"
                            >
                                {title}
                            </Typography>
                            <ul className="space-y-1">
                                {links.map((link, key) => (
                                    <Typography
                                        key={key}
                                        as="li"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        <a
                                            href="#"
                                            className="inline-block py-1 pr-2 transition-transform hover:scale-105"
                                        >
                                            {link}
                                        </a>
                                    </Typography>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="flex w-full flex-col items-center justify-center border-t border-blue-gray-50 py-4 md:flex-row md:justify-between">
                    <Typography
                        variant="small"
                        className="mb-4 text-center font-normal text-blue-gray-900 md:mb-0"
                    >
                        &copy; {currentYear}{" "}
                        <a href="https://material-tailwind.com/">
                            FOODEI International
                        </a>
                        . All Rights Reserved.
                    </Typography>
                </div>
            </div>
        </footer>
    );
}
