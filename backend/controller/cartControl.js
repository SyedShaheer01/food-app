
import User from "../modal/user.js";

const addCart = async(req,res)=>{

try {
    let userData = await User.findById(req.body.userId)
    let cartData = await userData.cartData
    
    if(!cartData[req.body.itemId]){

        cartData[req.body.itemId] = 1
    }
    else{
        cartData[req.body.itemId] += 1

        
        

    }
    await User.findByIdAndUpdate(req.body.userId,{cartData})
    // console.log(cartData[req])

    res.status(200).send({message:"product added to cart",success:true, cartData})
    
} catch (error) {
    console.log(error)
    res.status(400).send({message:error.message,success:false})

    
}

}

const removeCart= async(req,res)=>{

    try {
        let userData = await User.findById(req.body.userId)
        let cartData = await userData.cartData
        if(cartData[req.body.itemId]>0){

            cartData[req.body.itemId] -= 1
    
        }

        await User.findByIdAndUpdate(req.body.userId, {cartData})

        res.status(200).send({message:"product remove from cart",success:true,cartData})
        
    } catch (error) {
        res.status(401).send({success:false,message:error.message})
        
    }



}

const getCart = async (req,res)=>{
    try {


        let userData= await User.findById(req.body.userId)
        let cartData = await userData.cartData
        // await userData.findByIdAndUpdate(req.body.userId, {cartData})


        res.status(200).send({message:"All cart items", cartData ,success:true})
    } catch (error) {
        
        res.status(400).send({message:error.message,success:false})
        
    }


}


export{addCart,removeCart,getCart}