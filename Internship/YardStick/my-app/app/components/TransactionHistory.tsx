"use client"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/app/components/ui/table"
import { getTransactions } from "@/lib/getTransactions"
import { getDeleteTransaction } from "@/lib/getDeleteTransaction";

type Txn = {
    _id : string;
    type : "Debit" | "Credit"
    amount : number;
    date : String;
    description : string;
}
import { Trash2  } from "lucide-react";
import { useEffect, useState } from "react";
export default function TransactionHistory() {
    const [transactions, setTransactions] = useState<Txn[]>([]);
    useEffect(() => {
        const fetchTransactions = async () => {
          const txns = await getTransactions();
          setTransactions(txns);
        };
    
        fetchTransactions();
      }, []);
    const  handleDelete = async(id : string) => {
    try {
        await getDeleteTransaction(id);
        alert("Transaction deteled successfully");
        setTransactions(transactions.filter((txn) => txn._id !== id));
    } catch (error) {
        alert("Something went wrong");
    }
        
}
    return(
    <Table className="text-white">
        <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
                <TableRow>
                <TableHead >Date</TableHead>
                <TableHead >Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead >Description</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody >
                {transactions.map((txn : Txn) => (
                    <TableRow key={txn._id} >
                    <TableCell>{txn.date}</TableCell>
                    <TableCell>{txn.type}</TableCell>
                    <TableCell >₹ {txn.amount}</TableCell>
                    <TableCell >{txn.description}</TableCell>
                    <TableCell >
                    <button className="m-1 text-red-700" onClick={()=> handleDelete(txn._id)}><Trash2  /></button>
                    </TableCell>
                    </TableRow>
                ))}
                
            </TableBody>
    </Table>

    )
}