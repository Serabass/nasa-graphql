import mongoose from "mongoose";
import Env from "./env";

export default function mongoConnect(): Promise<any> {
// Connect to MongoDB
    return mongoose
        .connect(Env.MONGODB_URI, {
            useNewUrlParser: true,
        })
        .catch((err) => {
            console.log(`MongoDB connection error. Please make sure MongoDB is running. ${err}`);
            process.exit();
        });
}
