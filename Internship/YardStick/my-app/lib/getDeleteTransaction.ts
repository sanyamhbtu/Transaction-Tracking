import axios from "axios";

export async function getDeleteTransaction(id : string) {
    try {
        const response = await axios.delete(`http://localhost:3000/api/transactions/${id}`);
        console.log(response.data);
        return response.data;
        
    } catch (error) {
        console.log(error);
        throw error ;
    }
}