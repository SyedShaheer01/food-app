"use client"

import React, { useEffect, useState } from 'react'
import './Order.css'
import axios from 'axios'
import { assets } from '@/app/assets/assets'
import Image from 'next/image'

function Order() {
  const [order,setOrder]=useState([])
  // const [status,setStatus]=useState("")


  const fetchOrder=async()=>{
    await axios.get("https://food-app-backend-sable.vercel.app/api/order/Allorders")
    .then(res=>{
      console.log(res)
      setOrder(res.data.orders)

    })
    .catch(err=>{
      console.log(err)
    })

  }

  useEffect(()=>{
    fetchOrder()
    
  },[])
  

const changeHandler= async(e,orderId)=>{

  await axios.post("https://food-app-backend-gray.vercel.app/api/order/status",{orderId,status:e.target.value})
  .then(res=>{
    console.log(res)
    if(res.data.success){
     fetchOrder()

    }
  })
  .catch(err=>{
    console.log(err)
  })
  

}

  return (
    <div className='admin-order'>
      <h1>Orders</h1>
      <div className='order-wrap'>
      {order.map((v,i)=>{
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
                  <p className='bullet'>&#x25cf;
                    <select onChange={(e)=>changeHandler(e,v._id)} value={v.status}>
                      
                      {/* <option>{v.status}</option> */}
                      <option value={"food-processing"}>food-processing</option>
                      <option value={"food-dileverd"}>food-dileverd</option>
                    </select>
                    
                     {/* <span>{v.status}</span> */}
                     </p>

                </div>
              )
            })}
      </div>
      
    </div>
  )
}

export default Order
