import {connect} from '@/app/dbconfig/dpConfig'
import Transaction from '@/app/models/Transaction'
import { NextRequest, NextResponse } from 'next/server';
interface RouteParams {
    params: {
        id: String;
    };
}
export async function DELETE(req: NextRequest, {params} : RouteParams) : Promise<NextResponse>{
    try {
        await connect();
        const {id} = params;
        if(!id ){
            return NextResponse.json({message : "id not found"});
            
        }
        const deletedTransaction = await Transaction.findByIdAndDelete(id);
        if(!deletedTransaction){
            return NextResponse.json({error : "Transaction not deleted successfully"}, {status : 401});
        }
        return NextResponse.json({ message: "Transaction deleted successfully" });
    } catch (error) {
        return NextResponse.json({error : "Transaction not deleted successfully"}, {status : 401})
    }
}