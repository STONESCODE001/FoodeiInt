// src/QuoteFetcher.js
import React, { useState } from "react";
import { getQuotes } from "./API.tsx";

const QuoteFetcher = () => {
    const [shipmentData, setShipmentData] = useState({
        origin: "Nairobi",
        destination: "Mombasa",
        weight: 10 // Example weight
        // Add other shipment data as needed
    });

    const [quotes, setQuotes] = useState(null);
    const [error, setError] = useState(null);

    const fetchQuotes = async () => {
        try {
            const data = await getQuotes(shipmentData);
            setQuotes(data);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <button onClick={fetchQuotes}>Get Quotes</button>
            {error && <p>Error: {error}</p>}
            {quotes && (
                <ul>
                    {quotes.map((quote, index) => (
                        <li key={index}>
                            {quote.rate} - {quote.service}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default QuoteFetcher;
