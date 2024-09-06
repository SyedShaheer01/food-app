"use client"

import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios'
import Image from 'next/image'
import Swal from 'sweetalert2'


function List() {

  const[prodcut , setProduct] = useState([])
  // axios.defaults.withCredentials=true


  useEffect(()=>{
     axios.get("http://localhost:8000/api/list")
    .then(res=>{
      console.log(res)
    setProduct(res.data.data)

    })

  },[prodcut])

  const deleteProduct=(id)=>{
    axios.post("https://food-app-backend-sable.vercel.app/api/foodremove",{
      id
    })
    
    .then(res=>{
      console.log(res)
      Swal.fire({
        title: res.data.message,
        icon: "success"
      });
    })
    .catch(err=>{
      console.log(err)
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.message,
      });

    })
    // console.log(id)
    // console.log(index)
    const index = prodcut.findIndex(elem => elem._id === id)
    prodcut.splice(index,1)
    setProduct(prodcut)
  }

  return (
    <div className='db-product'>
      <div className='db-product-title db-flex' >
        <p>Image</p>
        <p>Name</p>
        <p>Description</p>
        <p>Price</p>
        <p>Category</p>
        <p>remove</p>

      </div>
   

      <div className='db-product-list'>


          
          
        {
          
          prodcut.map((v,i)=>{
            
            return(
            // prodcut.length > 0 &&

            <div className='db-flex' key={i}> 
            <img width={100} src= {v.image} alt=''/> 
           <p>{v.name}</p>
           <p>{v.description}</p>
           <p>${v.price}</p>
           <p>{v.category}</p>
           <p className='db-remove' onClick={()=> deleteProduct(v._id)}>X</p>
            </div>
          )
        })
      
        
      }
      
      {
        prodcut.length > 0 ?
        <hr/>:<></>
      }
      {!prodcut.length &&
      
      <h1>No products!</h1>
    }
        </div>

        
        </div>
      )
}

export default List
