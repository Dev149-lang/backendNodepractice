import express from "express";
import dotenv from "dotenv";
import cors from "cors";


dotenv.config();

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true ,  
    methods: ['GET', 'POST', 'DELETE','OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}))


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






app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
