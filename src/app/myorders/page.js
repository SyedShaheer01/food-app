"use client"

import './myorder.css'
import Footer from '../footer/page.js'
import Navbar from '../navbar/page.js'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../contex/page'
import { assets } from '../asstes/assets'
import Image from 'next/image'
import path from 'path'
import { usePathname } from 'next/navigation'


function MyOrder() {
  const [orders,setorders] =useState([])
  const { token }=useContext(StoreContext)

  const pathname=usePathname()

  useEffect(()=>{
    if(localStorage.getItem("token")){
      if(pathname !== '/myorders' && pathname !== '/cartItems' && pathname !== '/order' && pathname !== '/'){
        window.location='/myorders'

      }
      
    }
    
    else{
      // if(!localStorage.getItem('token')){
        window.location='/'
      // }
    }
   
  },[])


  
  const fetchOrders = async()=>{
        await axios.post("https://food-app-backend-ashy.vercel.app/api/order/userorders",{},{headers:{token}}) 
        .then(res=>{
        setorders(res.data.data)
        console.log(res)
      })
        .catch(err=>{
          console.log(err)
        })
        
      }
      
      useEffect(()=>{
        if(token){
          fetchOrders()
        }
      },[token])
      
      
      return (
        <div className='main-order'>
          <div className='order-wrap'>


        <Navbar/>
        <div className='my-order'>
          <h1>My Orders</h1>
          <div className='orders-container'>
            {orders.map((v,i)=>{
              return(
                <div key={i} className='my-all-order'>
                  <Image src={assets.parcel_icon} alt=''/>
                  <p>{v.items.map((item,index)=>{
                    if(index === v.items.length-1){
                      return item.name +" x " +item.quantity
                    }
                    else{
                      return item.name +" x " +item.quantity+ " , "
                      
                      
                    }

                  })}</p>
                  <p>${v.amount}</p>
                  <b>items:{v.items.length}</b>
                  <p className='bullet'>&#x25cf; <span>{v.status}</span></p>

                </div>
              )
            })}
            
          </div>

        </div>
    
        <div>
    </div>
      </div>
        <Footer/>      
    </div>
  )
}

export default MyOrder
