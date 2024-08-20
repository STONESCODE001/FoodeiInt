import { db } from "../FirebaseFiles/firebaseconfig.tsx";
import React, { createContext, useState, useEffect, ReactNode } from "react";
import {
    collection,
    query,
    where,
    getDocs,
    onSnapshot
} from "firebase/firestore";

interface CatalogContextType {
    productsList: any[];
    loading: boolean;
    error: string | null;
}

const CatalogContext = createContext<CatalogContextType | undefined>(undefined);

export const CatalogProvider: React.FC<{ children: ReactNode }> = ({
    children
}) => {
    const [productsList, setProductsList] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchCatalogData();
                setProductsList(data);
            } catch (err) {
                setError("Failed to fetch catalog data.");
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    const fetchCatalogData = async () => {
        try {
            const catalogRef = collection(db, "Catalog");
            const snapshot = await getDocs(catalogRef);
            //const snapshot = await catalogRef.get();
            const data = snapshot.docs.map(doc => doc.data());
            console.log("quering db,", data);
            return data;
        } catch (error) {
            console.error("Error fetching catalog data: ", error);
            return [];
        }
    };

    return (
        <CatalogContext.Provider value={{ productsList, loading, error }}>
            {children}
        </CatalogContext.Provider>
    );
};

export const useCatalog = () => {
    const context = React.useContext(CatalogContext);
    if (context === undefined) {
        throw new Error("useCatalog must be used within a CatalogProvider");
    }
    return context;
};
