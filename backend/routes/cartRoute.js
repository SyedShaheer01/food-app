import express from 'express'
import { addCart, getCart, removeCart } from '../controller/cartControl.js'
import VerifyToken from "../middleWhere/verifyToken.js";




const cartRouter = express.Router()

cartRouter.post("/addCart", VerifyToken, addCart)
cartRouter.post("/removeCart", VerifyToken, removeCart)
cartRouter.post("/getCart", VerifyToken, getCart)


export default cartRouter
