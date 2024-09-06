"use client"

import './Add.css'
import Image from 'next/image'
import { assets } from '@/app/assets/assets'
import { useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

function Add() {
  const [image,setImage]= useState(false)
  const [data, setData]=useState({
    name :"",
    description:"",
    price:"",
    category:""
  })
  // axios.defaults.withCredentials=true

  const onChangeHandler = (event) =>{
    const name = event.target.name;
    const value = event.target.value
    setData(data=>({...data,[name]:value}))
  }

  const submit= async(e)=>{

    e.preventDefault()
    const formData= new FormData()
    formData.append("name",data.name)
    formData.append("description",data.description)
    formData.append("price",Number(data.price))
    formData.append("category",data.category)
    formData.append("image",image)


    try {

     await axios.post("https://food-app-backend-sable.vercel.app/api/add",formData,)
      .then(res=>{
        console.log(res)
        Swal.fire({
          title: res.data.message,
          icon: "success"
        });

        if(res.data.success){


          setData({
            name :"",
            description:"",
            price:"",
            category:""
          })

          setImage(false)
        }
      })
    
    } catch (error) {

      console.log(error)
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
        footer: '<a href="#">Why do I have this issue?</a>'
      });
    }
  }

  return (
    <div className='add'>
      <form onSubmit={submit} className='flex-col'>
        <div className='add-upload flex-col'>
          <p>upload Image</p>
          <label htmlFor='image'>
            {!image ?

              <Image src={assets.upload_area} alt=''/>
           :
          <img  width={100} src={ URL.createObjectURL(image)} alt=''/>
           }
          </label>
          <input onChange={(e)=>setImage(e.target.files[0])}  type='file'  id="image"  hidden required />
        </div>
        

        <div className='add-product-name'>
          <p>Product Name</p>
          <input onChange={onChangeHandler} value={data.name} name='name' type='text' required placeholder='Enter product name'/>
        </div>

        <div className='product-description'>
          <p>Procut description</p>
          <textarea onChange={onChangeHandler} value={data.description} name='description' required placeholder='Enter product description'  cols={24} rows={5}/>
        </div>

      <div className='product-flex'>
        <div className='product-category'>
          <p>Product Category</p>
          <select onChange={onChangeHandler} name='category' required >
            <option selected disabled >select</option>
            <option  value={"Salad"}>Salad</option>
            <option value={"Pure Veg"}>Pure Veg</option>
            <option value={"Pasta"}>Pasta</option>
            <option value={"Rolls"}>Rolls</option>
            <option value={"Sandwich"}>Sandwich</option>
            <option value={"Cake"}>Cake</option>
            <option value={"Deserts"}>Deserts</option>
            <option value={"Noodles"}>Noodles</option>
          </select>

        </div>
        <div className='product-price'>
          <p>Product Price</p>
          <input onChange={onChangeHandler} value={data.price} type='number' name="price" required placeholder='Enter price'/>

        </div>
      </div>
        
      <button type='submit' className='form-btn'>Add</button>
      </form>

      
    </div>
  )
}

export default Add
