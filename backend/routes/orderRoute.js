import express from 'express'
import { fetchOrder, placeOrder, statusUpdate, userOrder, verifyOrder } from '../controller/orderControl.js'
import VerifyToken from '../middleWhere/verifyToken.js'


const orderRouter = express.Router()

orderRouter.post('/place',VerifyToken, placeOrder)
orderRouter.post('/verify', verifyOrder)
orderRouter.post('/userorders', VerifyToken, userOrder)
orderRouter.get('/Allorders', fetchOrder)
orderRouter.post('/status', statusUpdate)

export default orderRouter

