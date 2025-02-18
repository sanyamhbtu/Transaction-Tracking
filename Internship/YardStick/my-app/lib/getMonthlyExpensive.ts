import axios from "axios";

type Expenses = {
    month: string;
    expenses: number;
};
type Transaction = {
    amount: number;
    type: string;
    date: string;
    description: string;
}
export const getMonthlyExpenses = async (): Promise<Expenses[]> => {
    try {
        const response = await axios.get("http://localhost:3000/api/transactions");
        const transactions = response.data.transactions;

        const monthMap: { [key: string]: number } = {};

        transactions.forEach((transaction: Transaction) => {
            const dateParts = transaction.date.split("/");
            let monthNumber: number;

            if (dateParts.length === 3) {
                monthNumber = parseInt(dateParts[1]);
            } else {
                monthNumber = parseInt(transaction.date.split("-")[1]);
            }

            if (isNaN(monthNumber) || monthNumber < 1 || monthNumber > 12) return;

            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            const month = monthNames[monthNumber - 1];

            const amount = transaction.amount;
            const type = transaction.type;

            if (!monthMap[month]) {
                monthMap[month] = 0;
            }

            monthMap[month] += type === "Credit" ? amount : -amount;
        });

        return Object.keys(monthMap).map((month) => ({
            month,
            expenses: monthMap[month],
        }));
    } catch (error) {
        console.error("Error fetching transactions:", error);
        return [];
    }
};
