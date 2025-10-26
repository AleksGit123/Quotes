import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import router from "./routes/router.js"
import mongoose from "mongoose";
import session from "express-session"; 
import MongoStore from 'connect-mongo'; 

// port
const PORT = process.env.PORT || 8080;
// server
const app = express();

// middleware
app.use(cors({
    origin: "http://localhost:8080", // დაამატეთ თქვენი ფრონტენდის მისამართი
    credentials: true // აუცილებელია ქუქი-ფაილების გასაგზავნად
}));

app.use(express.json());

let mongoURL = "mongodb+srv://quotesDatabase:quotes@cluster0.8i2udgx.mongodb.net/test?appName=Cluster0";

app.use(session({
    secret: '8a9405de5434c41af102694ea4c5d295c1c6853a006d781baae2e8d50663ac21', // გამოიყენე ძლიერი, საიდუმლო სტრიქონი
    resave: false,
    saveUninitialized: false, // რეკომენდებულია
    store: MongoStore.create({ 
        mongoUrl: mongoURL,
        ttl: 14 * 24 * 60 * 60, // სესიის ვადა: 14 დღე
    }),
    cookie: { 
        maxAge: 1000 * 60 * 60 * 24 * 14, // 14 დღე
        httpOnly: true, // უსაფრთხოებისათვის
        
        // secure: true // თუ იყენებთ HTTPS-ს (production-ში აუცილებელია)
    }
}));


async function connectDb(){
    try {
        await mongoose.connect(mongoURL);
        console.log("წარმატებით დაუკავშირდა MongoDB - ს");


    } catch (error) {

        console.log("შეცდომა!!!");
        console.log(error);
    }
}


connectDb();

// variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectFolder = path.join(__dirname, "..");
const publicFolder = path.join(projectFolder, "public");


// quotes object
app.use("/",router)

// server listening and static
app.use(express.static(publicFolder));
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});