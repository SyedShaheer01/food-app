import orderModel from '../modal/order.js'
import userModel from '../modal/user.js'
import Stripe from 'stripe'
import 'dotenv/config.js'

const stripe = new Stripe(process.env.STRIPE_SECRET)


const placeOrder = async (req, res) => {
    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        })
        await newOrder.save()
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} })
        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.name

                },
                unit_amount: item.price * 100

            },
            quantity: item.quantity


        }))
        line_items.push({
            price_data: {
                currency: "usd",

                product_data: {
                    name: "delivery charges",
                },
                unit_amount: 2 * 100

            },
            quantity: 1

        })
        const session = await stripe.checkout.sessions.create({

            line_items: line_items,
            mode: 'payment',
            success_url: `https://food-app-one-pearl.vercel.app/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `https://food-app-one-pearl.vercel.app/verify?success=false&orderId=${newOrder._id}`,
        })
        res.send({ success: true, session_url: session.url })

    } catch (err) {
        console.log(err)
        res.send({ success: false, message: err })

    }


}


const verifyOrder = async (req, res) => {

    const { orderId, success } = req.body
    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: "true" })
            res.send({ success: true, message: "paid" })

        }
        else {
            await orderModel.findByIdAndDelete(orderId)
            res.send({ success: false, message: "Not paid" })

        }

    } catch (error) {
        console.log(err)

    }

}

const userOrder = async (req, res) => {
    try {
        const order = await orderModel.find({ userId: req.body.userId })
        res.send({ success: true, data: order })

    } catch (error) {
        res.send({ success: false, message: error })


    }

}


const fetchOrder = async (req, res) => {
    try {
        const allOrder = await orderModel.find({})
        res.send({ orders: allOrder, success: true })
    } catch (err) {
        res.send({ message: err, sucess: false })

    }

}

const statusUpdate= async(req,res)=>{
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})

        res.send({message:"status updated", success: true})
        
    } catch (error) {
        res.send({ message:error, success: false })

        
    }

}

export { placeOrder, verifyOrder, userOrder, fetchOrder,statusUpdate }