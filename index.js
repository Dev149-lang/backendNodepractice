import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import db from "./utils/db.js"; 
import cookieParser from "cookie-parser";

// import all routes 
import userRoutes from "./routes/user.routes.js";

dotenv.config();

const app = express();

app.use(cors({
    origin: process.env.BASE_URL ,   //'http://localhost:3000',
    credentials: true ,  
    methods: ['GET', 'POST', 'DELETE','OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());




app.get('/', (req, res) => {
    res.send('Hello World!') 
})

app.get('/twitter',(req,res)=>{
    res.send('winterxback')
})



const port = process.env.PORT || 3000;

app.get('/login', (req,res)=>{
    res.send('<h1>pls login kro <h1/>')
})

app.get('/youtube', (req,res)=> {
    res.send('<h2>fffg <h2/>')
})


// connect to db
 
db();

// user routes

app.use("/api/v1/users/", userRoutes)
 
 



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
