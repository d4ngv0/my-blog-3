import express from "express"
import { APP_PORT } from "./configs/EnvConfig.js";
import BlogRouter from "./routers/BlogRouter.js";
import cors from 'cors';

const app= express();


app.use(
    cors({
        origin: ['http://localhost:4000'],
        methods: ['GET', 'POST', 'PUT', 'DELETE'], 
        allowedHeaders: ['Content-Type'], 
        credentials: true, 
    })
)
app.use(express.json());


app.use("/", BlogRouter);



app.listen(APP_PORT,()=>{
          console.log(`App start successfully on port ${APP_PORT}`);
})