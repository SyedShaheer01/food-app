import foodModel from "../modal/index.js";
import fs from 'fs-extra'
import cloudinary from "../utils/cloudinary.js";

/// add food item

// const addFood= async(req,res)=>{
    
//     // let result = await cloudinary.uploader.upload(req.file.path)
//     // let imageUrl= result.url

    
//     let image_filename=`${req.file.filename}`

//     const food= new foodModel({
//         name:req.body.name,
//         description:req.body.description,
//         price:req.body.price,
//         category:req.body.category,
//         image: image_filename

//     })




//     try {
//         console.log("req-->",req.body)
//         // const food =new foodModel(req.body)
//         await food.save()
//         res.status(200).send({message:"Product added", success:true, details:food})
        
//     } catch (error) {
//         res.status(400).send({message:"error" ,success:false})
        
//     }

// }

const fooList= async (req,res)=>{

    try {
        const foods= await foodModel.find({})
        res.status(200).send({message:"All products", data:foods})
        
    } catch (error) {
        res.send({message:error})
        
    }

}

const remove= async (req,res)=>{

    try {

        const food = await foodModel.findById(req.body.id)

        fs.remove(`uploads/${food.image}`, err => {
            if (err) return console.error(err)
            console.log('success!')
          })

        await foodModel.findByIdAndDelete(req.body.id)
        
        res.send({message:"Product Deleted",success:true})

    } catch (error) {
        res.send({message:error.message ,success:false})

        
    }


}

export{fooList,remove}
