import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import UserDashboard from "../src/Pages/UserDashboard.tsx";
import ErrorPage from "../src/Pages/errorPage.tsx";
import SignInPage from "../src/Pages/SignInPage.tsx";
import SignUpPage from "../src/Pages/SignUpPage.tsx";
import Catalog from "../src/Pages/CatalogPage.tsx";
import ProductListingComponent from "../src/components/singleProductListingComponent.tsx";
import { AuthProvider } from "../src/contexts/AuthContexts.tsx";
import CheckoutPage from "./Pages/checkoutPage.tsx";
import { CatalogProvider } from "../src/contexts/queryFirestoreData.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />
    },
    {
        path: "/Dashboard",
        element: <UserDashboard />,
        errorElement: <ErrorPage />
    },
    {
        path: "/SignIn",
        element: <SignInPage />,
        errorElement: <ErrorPage />
    },
    {
        path: "/SignUp",
        element: <SignUpPage />,
        errorElement: <ErrorPage />
    },
    {
        path: "/Catalog",
        element: <Catalog />,
        errorElement: <ErrorPage />
    },
    {
        path: "/Listing",
        element: <ProductListingComponent />,
        errorElement: <ErrorPage />
    },
    {
        path: "/productsList/:id",
        element: <ProductListingComponent />,
        errorElement: <ErrorPage />
    },
    {
        path: "/Checkout/:productId",
        element: <CheckoutPage />,
        errorElement: <ErrorPage />
    }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <AuthProvider>
            <CatalogProvider>
                <ThemeProvider>
                    <RouterProvider router={router} />
                </ThemeProvider>
            </CatalogProvider>
        </AuthProvider>
    </React.StrictMode>
);
