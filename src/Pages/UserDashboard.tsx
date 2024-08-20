import React, { useState, useEffect } from "react";
import { Typography, Button, Avatar } from "@material-tailwind/react";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import FooterComponent from "../components/FooterComponent.tsx";
import NavbarComponent from "../components/NavbarComponent.tsx";
import ButtonSwitcher from "../Pages/ButtonSwitcher.tsx";
import { db } from "../FirebaseFiles/firebaseconfig.tsx";
import { useAuth } from "../contexts/AuthContexts.tsx";
import {
    collection,
    query,
    where,
    getDocs,
    onSnapshot
} from "firebase/firestore";

export default function Dashboard() {
    const { user, loading } = useAuth();
    const [queryResult, setqueryResult] = useState([]);
    const [bizName, setbizName] = useState("loading...");
    const [fullName, setfullName] = useState("loading...");
    const [acctType, setacctType] = useState("loading....");

    useEffect(() => {
        if (!user) {
            console.log("No user is signed in.");
            return;
        }

        const userUid = user.uid;

        async function queryDb() {
            try {
                const usersRef = collection(db, "Users");
                const q = query(usersRef, where("uid", "==", userUid));
                const querySnapshot = await getDocs(q);
                const queryResult = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                //console.log(queryResult);
                queryResult.forEach(doc => {
                    setbizName(doc.businessName);
                    setacctType(doc.accountType);
                    setfullName(doc.firstName + "" + doc.lastName);
                });
            } catch (e) {
                console.error("Error querying documents: ", e);
            }
        }

        queryDb();
    }, [user, loading]); //

    return (
        <>
            <NavbarComponent />
            <div className="flex w-auto h-auto justify-center mt-14">
                <div className="text-center">
                    <div>
                        <Avatar
                            varient="circular"
                            size="xl"
                            className="border-2 border-gray-900 h-[85px] w-[85px] "
                        />

                        <Typography className="font-kanit font-bold text-xl">
                            {" "}
                            {fullName}({acctType})
                        </Typography>
                        <Typography className="text-gray-400 font-normal text-md">
                            {" "}
                            {bizName}{" "}
                        </Typography>
                    </div>
                    ;
                    <ButtonSwitcher />
                </div>
            </div>
            <FooterComponent />
        </>
    );
}
