import {connect} from '@/app/dbconfig/dpConfig'
import { NextResponse } from "next/server";
import Transaction from "@/app/models/Transaction";
import { transactionSchema } from '@/app/schema/zodValidation';
export async function POST(req : Request){
    
    try {
        await connect();
        const { amount,type, date, description } = await req.json();
            
        if (!amount || !date || !description || !type) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }
        const parsedData = transactionSchema.safeParse({ amount : Number(amount), type, date, description });
        if(!parsedData.success){
            return NextResponse.json({ error: "Invalid data" }, { status: 400 });
        }
        const newTransaction = await Transaction.create({ amount : Number(amount), type,  date , description });
        return NextResponse.json(newTransaction, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}

export async function GET(){
    try {
        await connect();
        const transactions = await Transaction.find();
        return NextResponse.json({ transactions }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch transactions" }, { status: 500 });
    }
}
