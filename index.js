import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connect from "./connectDatabase/connect.js";
import formRoute from "./routes/formDetails.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


app.use('/api',formRoute);


app.listen(PORT, ()=>{
    connect();
    console.log("server running at port : "+PORT);
})