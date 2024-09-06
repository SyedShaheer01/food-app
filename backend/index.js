import express from 'express'
import cors from 'cors'
import mongoose from './config/index.js'
import foodRouter from './routes/foodRoute.js'
import userRouter from './routes/userRoute.js'
import 'dotenv/config.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'
import path from 'path'
import bodyParser from 'body-parser'



const app=express()
// const corsOptions = {
//     origin: 'https://food-app-admin-rouge.vercel.app',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization']
//   };
const corsOptions = {
    origin: 'https://food-app-admin-rust.vercel.app', // Allow this origin
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
  };
  
  app.use(cors(corsOptions));
  
  // Handle preflight requests
  app.options('*', cors(corsOptions))

  app.use(express.json())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const PORT= process.env.PORT || 8000

const db= mongoose.connection;
db.on("error", console.error.bind(console,"connection error"))
db.once("open", function(){
    console.log("db connected!")
})



app.get('/',(req,res)=>{
    res.send("server is working")


})
app.use('/api', foodRouter )  
app.use('/images', express.static(path.join('/tmp', 'uploads')));
app.use('/user',userRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)




app.listen(PORT,()=>{
    console.log(`port is running on ${PORT}`)

    
});   