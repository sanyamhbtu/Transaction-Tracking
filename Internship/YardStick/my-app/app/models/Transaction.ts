import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
    amount : {type : Number, required : true},
    type : {type : String, required : true},
    date : {type : String, required : true},
    description : {type : String, required : true}
})

const Transaction = mongoose.models.Transaction ||  mongoose.model("Transaction", TransactionSchema);

export default Transaction;