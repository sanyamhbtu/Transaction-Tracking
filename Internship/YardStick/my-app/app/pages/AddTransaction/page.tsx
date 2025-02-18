"use client"
import { useRouter } from "next/navigation";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { useState } from "react"
import axios from 'axios';
export default function AddTransaction() {
  const router = useRouter();
  const [description , setDiscription] = useState<string>("");
  const [date, setDate] = useState<string>("")
  const [amount, setAmount] = useState<number>(0);
  const [type, setType] = useState<"Debit" | "Credit">("Debit");
  const handleSubmit = async () => {
    try {
      await axios.post("/api/transactions",{
        amount : Number(amount),
        type,
        date,
        description
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        setDiscription("");
        setAmount(0);
        setDate("");
        alert("Transaction added successfully");
        router.push("/");
    } catch (error) {
       alert(`Something went wrong ${error}`);
       return;
    }
      
  }
    return(
        <Card className="  border-none">
      <CardHeader>
        <CardTitle>Add Transaction</CardTitle>
        
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="amount">Amount</Label>
              <Input id="amount" type="number" placeholder="Put your amount here" onChange={(e) => {setAmount(Number(e.target.value))}}/>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="type">type</Label>
              <select className="bg-slate-900 text-yellow-50 p-2 border" id="type" onChange={(e) => setType(e.target.value as "Debit" | "Credit")} >
                <option value="Debit">Debit</option>
                <option value="Credit">Credit</option>
            </select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" placeholder="01/01/2025" onChange={(e) =>{setDate(e.target.value)}}/>
            </div>
            
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="discription">Description</Label>
              <textarea id="discription" className="bg-slate-900 text-yellow-50" placeholder="Describe your transaction" onChange={(e) => {setDiscription(e.target.value)}}/>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end">
        
        <Button onClick={handleSubmit}>Add Transaction</Button>
      </CardFooter>
    </Card>
    )
}