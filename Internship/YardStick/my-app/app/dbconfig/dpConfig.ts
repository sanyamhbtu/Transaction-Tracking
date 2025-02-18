import mongoose from 'mongoose';

export async function connect (): Promise<mongoose.Connection | void> {
    if (!process.env.MONGO_URL) {
        console.log("Connection string not found");
        return;
    }

    try {
        const con = await mongoose.connect(process.env.MONGO_URL);
        console.log("Database connected successfully");
        return con.connection;
    } catch (error) {
        console.log(`Error in connection to database: ${error}`);
    }
}