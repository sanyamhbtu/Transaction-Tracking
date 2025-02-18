"use client"
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import {getMonthlyExpenses} from '@/lib/getMonthlyExpensive'
export default function MonthlyChart() {
    const [data, setData] = useState<{month : string , expenses : number}[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const expenses = await getMonthlyExpenses();
                setData(expenses);
            } catch (error) {
                console.error("Error fetching monthly expenses:", error);
            }
        }
        fetchData();
        const intervalId = setInterval(fetchData, 5000);
        return () => clearInterval(intervalId);
        
    },[])
    return (
        <div className="bg-gray-900 text-white p-4 rounded-lg shadow-md h-4/5">
            <h2 className="text-lg font-semibold mb-4">Monthly Expenses</h2>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={data}>
                    <XAxis dataKey="month" stroke="white" />
                    <YAxis stroke="white" />
                    <Tooltip contentStyle={{ backgroundColor: "#333", color: "#fff" }} />
                    <Bar dataKey="expenses" fill="#4f46e5" radius={[5, 5, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}