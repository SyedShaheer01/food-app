import express from 'express'
import cors from 'cors'
import mongoose from './config/index.js'
import foodRouter from './routes/foodRoute.js'
import userRouter from './routes/userRoute.js'
import 'dotenv/config.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'
import path from 'path'



const app=express()
// const corsOptions = {
//     origin: 'https://food-app-admin-rouge.vercel.app',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization']
//   };
const allowedOrigins = [
    // 'https://food-app-admin-rust.vercel.app',  // Frontend
    'https://food-app-admin-rust.vercel.app'        // Admin
  ];
  
  // Configure CORS
  app.use(cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  }));


app.use(express.json())


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
// app.use('/images', express.static(path.join('/tmp', 'uploads')));
app.use('/user',userRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)




app.listen(PORT,()=>{
    console.log(`port is running on ${PORT}`)

    
});   