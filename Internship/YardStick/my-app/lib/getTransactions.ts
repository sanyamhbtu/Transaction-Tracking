
import axios from "axios";

export async function getTransactions() {
    try {
        const response = await axios.get("http://localhost:3000/api/transactions");
        return response.data.transactions;
    } catch (error) {
        console.log(error);
        return [];
    }
}