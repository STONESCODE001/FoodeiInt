import axios from "axios";

const BASE_URL =
    "https://api.terminal.africa/tship/rate/get-quotes-for-shipment";

export const getQuotes = async (shipmentData) => {
    try {
        const response = await axios.post(BASE_URL, shipmentData, {
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_TERMINAL_AFRICA_API_KEY}`,
                "Content-Type": "application/json"
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching quotes:", error);
        throw error;
    }
};