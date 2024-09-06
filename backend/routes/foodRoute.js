import express from 'express'
import {fooList, remove } from '../controller/foodControl.js'
import multer from 'multer'
import cloudinary from '../utils/cloudinary.js'
import path from 'path'
import { mkdirp } from 'mkdirp'
import foodModel from '../modal/index.js'


const foodRouter=express.Router()

/// image storage

// (req, file, cb) {
//   const uploadPath = path.join('/tmp', 'uploads');
//   mkdirp.sync(uploadPath); 
//   cb(null, uploadPath);
// },


const storage = multer.diskStorage({

    destination:function (req, file, cb) {
        const uploadPath = path.join('/tmp', 'uploads');
        mkdirp.sync(uploadPath); 
        cb(null, uploadPath);
      },
      
    filename:(req, file, cb)=> {
    console.log("file--->", file)
      return cb(null, file.originalname) ////,file.mimetype
    }
  })
  const upload = multer({ storage: storage })

foodRouter.post("/add", upload.single("image"),async(req,res)=>{
    const upload= await cloudinary.uploader.upload(req.file.path)
    // console.log(upload)
    const food= new foodModel({
              name:req.body.name,
              description:req.body.description,
              price:req.body.price,
              category:req.body.category,
              image: upload.url
      
          })
      
      
      
      
          try {
              console.log("req-->",req.body)
              // const food =new foodModel(req.body)
              await food.save()
              res.status(200).send({message:"Product added", success:true, details:food})
              
          } catch (error) {
              res.status(400).send({message:"error" ,success:false})
              
          }
      
      })


foodRouter.get('/list',fooList)


foodRouter.post('/foodremove',remove)











export default foodRouter