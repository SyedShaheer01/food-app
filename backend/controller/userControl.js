// import express from "express"
// import  VerifyToken  from "../middleWhere/verifyToken.js"
import User from "../modal/user.js"
import bcrypt from "bcrypt"
import jwt  from "jsonwebtoken"
import Joi from "joi"
import validator from "validator"
import 'dotenv/config.js'




// const userSchema= Joi.object({
//     name: Joi.string().required(),
//     email:Joi.string().email().required(),
//     password: Joi.string().required().min(6)
// })


const Signup = async(req,res)=>{

    try{
      const {name,email,password}=req.body
      const exist = await User.findOne({email})
        // await userSchema.validateAsync(req.body);
        if(exist){
          return res.status(400).send({message:"duplicate email!"})

        }

        if(!validator.isEmail(email)){
          res.status(401).send({message:"please enter valid email",success:false})
        }
        
        if(password.length< 6){
          res.status(401).send({message:"please enter strong password",success:false})
          
          
        }
        const hashPassword = await bcrypt.hash(password, 10); /// pass ko hash krne k liye method ///

        const newUser =new User({
          name:name,
          email:email,
          password:hashPassword

        })

        const user = await newUser.save()
        const token = createToken(user._id)
        
        
      // console.log("req-->",req.body)
      // const newUser= await user.save()
      
      return res.status(200).send({message: "successfully Signup", user, token }) 
      
     }catch(err){
         return res.status(400).send({ status:400,message: err.message})
         
        }


    }
    
    
    const Login = async (req,res)=>{

            try{
                const {email, password}= req.body
                const user= await User.findOne({email})
                // .then(res=> res.toObject())/// for delet pass use toObject//
                //// aur find one find kre ga email ko k wo hai ya nh///
            if(!user){ //// agar email ghlat ho///
               return res.status(400).send({status:403,message:"user not exist"});
            }
            console.log("user>...", user)
        
          const compare= await bcrypt.compare(password,user.password); /// pass ko check krne k liye true ya false hai///
        
          if(!compare){ /// agar passs ghalat ho////
             return res.status(403).send({status:403,message:"wrong password"});
            
        
             
          }
          console.log("compare>>>", compare) 
          
            const token = createToken(user._id)
        
             return res.status(200).send({user, token ,message: "success"}) 
             
            }catch(err){
              return res.status(400).send({message:err.message})
            
        
            }

            
            
          }
          const createToken=(id)=>{
            return jwt.sign({id},process.env.JWT_SECRET)

          }
      
    export {Signup , Login} 
    
 
 