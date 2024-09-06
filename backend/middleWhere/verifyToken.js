import jwt  from "jsonwebtoken"
import 'dotenv/config.js'

const VerifyToken=(req,res,next)=>{

  

  const {token} = req.headers
  
  if(!token){
    return res.status(400).send({message:"unautherized login again"})

  }
    try {
      const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        req.body.userId = token_decode.id
        
        next()
      
    } catch (error) {

      console.log(error)
      res.status(401).send({message:error.message})
      
    }
}
export default VerifyToken
