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
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, '/tmp/uploads'); // Use __dirname for correct path resolution
    mkdirp.sync(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// Define the POST route
foodRouter.post('/add', upload.single('image'), async (req, res) => {
  try {
    const uploadResponse = await cloudinary.uploader.upload(req.file.path);
    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: uploadResponse.url
    });

    await food.save();
    res.status(200).send({ message: 'Product added', success: true, details: food });
  } catch (error) {
    res.status(400).send({ message: 'Error', success: false, error: error.message });
  }
});


foodRouter.get('/list',fooList)



foodRouter.post('/foodremove',remove)











export default foodRouter