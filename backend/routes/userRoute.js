import express from 'express'
import { Login, Signup } from '../controller/userControl.js'



const userRouter=express.Router()



userRouter.post('/signup',Signup)
userRouter.post('/login',Login)



export default userRouter
