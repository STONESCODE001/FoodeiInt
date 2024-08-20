import React, { useEffect } from "react";
import {
    Navbar,
    MobileNav,
    Typography,
    Button,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Avatar,
    Card,
    IconButton
} from "@material-tailwind/react";
import {
    HomeIcon,
    UserCircleIcon,
    Cog6ToothIcon,
    InboxArrowDownIcon,
    LifebuoyIcon,
    PowerIcon,
    ChevronDownIcon
} from "@heroicons/react/24/solid";
import FoodeiIcon from "../assets/FoodeiIcon.jpg";
import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContexts.tsx";
import { auth } from "../FirebaseFiles/firebaseconfig.tsx";
import { getAuth, signOut } from "firebase/auth";

// profile menu component
const profileMenuItems = [
    {
        label: "Home",
        icon: HomeIcon,
        path: "/"
    },
    {
        label: "My Dashboard",
        icon: UserCircleIcon,
        path: "/Dashboard"
    },
    {
        label: "Help",
        icon: LifebuoyIcon,
        path: "/Dashboard"
    },
    {
        label: "Sign Out",
        icon: PowerIcon,
        onClick: () => {
            const auth = getAuth();
            signOut(auth)
                .then(() => {
                    // Sign-out successful.
                    console.log("user Signed Out");
                    alert("You are Signed Out");
                })
                .catch(error => {
                    // An error happened.
                    console.log("error from signOut", error);
                });
        }
    }
];

function ProfileMenu() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const closeMenu = () => setIsMenuOpen(false);

    return (
        <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
            <MenuHandler>
                <Button
                    variant="text"
                    color="blue-gray"
                    className="flex items-center gap-1 rounded-xl py-0.5 pr-2 pl-0.5 lg:ml-auto"
                >
                    <Avatar
                        variant="rounded"
                        size="sm"
                        alt="tania andrew"
                        className="border border-gray-900 p-0.5"
                        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                    />
                    <ChevronDownIcon
                        strokeWidth={2.5}
                        className={`h-3 w-3 transition-transform ${
                            isMenuOpen ? "rotate-180" : ""
                        }`}
                    />
                </Button>
            </MenuHandler>
            <MenuList className="p-1 w-60">
                {profileMenuItems.map(({ label, icon, path, onClick }, key) => {
                    const isLastItem = key === profileMenuItems.length - 1;

                    const handleClick = () => {
                        if (onClick) {
                            onClick();
                        }
                        closeMenu();
                    };
                    return (
                        <Link to={path}>
                            <MenuItem
                                key={label}
                                onClick={handleClick}
                                className={`flex items-center  gap-2 rounded ${
                                    isLastItem
                                        ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                                        : ""
                                }`}
                            >
                                {React.createElement(icon, {
                                    className: `h-5 w-5 ${
                                        isLastItem ? "text-red-500" : ""
                                    }`,
                                    strokeWidth: 2
                                })}
                                <Typography
                                    as="span"
                                    variant="medium"
                                    className="font-normal"
                                    color={isLastItem ? "red" : "inherit"}
                                >
                                    {label}
                                </Typography>
                            </MenuItem>
                        </Link>
                    );
                })}
            </MenuList>
        </Menu>
    );
}

//this is the only part tht is working, the signin button is hidden, and the above code is for the profile dropdown
export default function NavbarComponent() {
    const { user, loading } = useAuth();
    /*useEffect(() => {
        if (loading) {
            console.log("Loading user info...");
        } else if (user) {
            console.log("User Info:", user);
        } else {
            console.log("User Signed Out");
        }
    }, [user, loading]);*/

    return (
        <Navbar className="mx-auto max-w-screen-xl p-2 lg:pl-6">
            <div className="relative mx-auto flex items-center justify-between text-blue-gray-900">
                <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-1">
                        <Avatar
                            src={FoodeiIcon}
                            alt="Icon"
                            variant="rounded"
                            size="xs"
                            class="bg-gray-100 border-0 "
                        />
                        <div>
                            <Typography
                                as="a"
                                href="#"
                                className="mr-4 ml-0 pl-0 cursor-pointer py-1.5 font-bold font-kanit"
                            >
                                FOODEI
                            </Typography>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4 hidden">
                    {loading ? (
                        <div className="animate-pulse">
                            <div className="h-8 w-24 bg-gray-300 rounded"></div>
                        </div>
                    ) : user ? (
                        <ProfileMenu />
                    ) : (
                        <Link to="/SignIn">
                            <Button className="bg-orange-700">
                                <span> Sign In </span>
                            </Button>
                        </Link>
                    )}
                </div>
            </div>
        </Navbar>
    );
}
