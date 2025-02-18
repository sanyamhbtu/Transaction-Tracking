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
        return NextResponse.json({ error: `Something went wrong ${error}`}, { status: 500 });
    }
}

export async function GET(){
    try {
        await connect();
        const transactions = await Transaction.find();
        return NextResponse.json({ transactions }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: `Failed to fetch transactions. ${error}` }, { status: 500 });
    }
}

export async function DELETE(req : Request){
    const {id} = await req.json();
    try {
        await connect();
        if (!id) {
            return NextResponse.json({ error: "Transaction ID is required" }, { status: 400 });
        }

        const deletedTransaction = await Transaction.findByIdAndDelete(id);
        if (!deletedTransaction) {
            return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
        }

        return NextResponse.json(
            {
                success: true,
                message: 'Transaction deleted successfully',
                data: deletedTransaction,
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json({ error: `Transaction deletion failed. ${error}` }, { status: 500 });
 
    }
}
