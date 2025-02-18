import mongoose from 'mongoose';

export async function connect () {
    if(process.env.MONGO_URL === undefined){
        console.log("Connection string not found");
        return;
    }
    try{
        const con = await mongoose.connect(process.env.MONGO_URL);
        return con;
    }catch(error){
        console.log(error,"error in connection to dp")
    }
}