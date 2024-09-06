"use client"

import React, { useState } from 'react'
import './order.css'
import Navbar from '../navbar/page'
import { useContext,useEffect } from 'react'
import { usePathname } from 'next/navigation';
import { StoreContext } from '../contex/page.js';
import axios from 'axios'
import Swal from 'sweetalert2'
import ClipLoader from "react-spinners/ClipLoader";





function Order() {
    const {getTotalAmount,food_list,cartItems,token} =useContext(StoreContext)
    const [spinner,setSpinner]=useState(false)

    const [data,setData] = useState({

      firstName:"",
      lastName:"",
      email:"",
      city:"",
      state:"",
      zipCode:"",
      country:"",
      phone:""
      
    })
    const pathname = usePathname()

  useEffect(()=>{

    if(localStorage.getItem("token")){

      if(pathname!=='/cartItems' && pathname!=='/order' && pathname!=='/'){
        window.location="/cartItems"
      }
      }
        else{
         
       window.location='/'
        
       }
       

  },[])
  

  const ChangeHandler=(event)=>{

    let name = event.target.name
    let value = event.target.value

    setData(data=>({...data,[name]:value}))

    }


    const placeOrder= async(event)=>{
      event.preventDefault()
      setSpinner(true)
      let orderItems = []
      food_list.map((item)=>{
        if (cartItems[item._id]>0){
          let itemInfo = item;
          itemInfo["quantity"] = cartItems[item._id]
          orderItems.push(itemInfo)
          
        }
        // console.log(order_items)
      })
      let orderData = {
        address:data,
        items:orderItems,
        amount:getTotalAmount()+2,
      }
    //   // console.log(data)
      await axios.post("https://food-app-backend-ashy.vercel.app/api/order/place",orderData,{headers:{token}})
     .then(res=>{
      if(res.data.success){
        const {session_url} = res.data
        window.location.replace(session_url)


      }
      else{
        alert("ERROR!")
      }
      setSpinner(false)
       })
     .catch(err=>{
      // console.log(err.message)
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.message,
      });
      setSpinner(false)
     })
      

    }
    


  return (
    <div>
      <div className='order-nav'>

        <Navbar/>
        </div>
              <form onSubmit={placeOrder}>
        <div className='order-parent'>
            <div className='order-left'>
              <h1>Delivery Information :</h1>

                <div className='inp-flex'>

                <input name='firstName' onChange={ChangeHandler}  value={data.firstName} required type='text' placeholder='First Name'/>
                <input name= 'lastName' onChange={ChangeHandler}  value={data.lastName} required type='text' placeholder='Last Name'/>
                </div>
                <input  name='email' onChange={ChangeHandler} value={data.email} required type='email' placeholder='Email Address'/>
                <div className='inp-flex-mid'>

                <input  name='city' onChange={ChangeHandler} value={data.city} required type='text' placeholder='City'/>
                <input  name='state' onChange={ChangeHandler}  value={data.state} required type='text' placeholder='State'/>
                </div>
                <input name='zipCode'  onChange={ChangeHandler} value={data.zipCode} required type='number' placeholder='Zip Code'/>
                <input name='country' onChange={ChangeHandler}  value={data.country} required type='text' placeholder='Country'/>
                <input  name='phone' onChange={ChangeHandler}   value={data.phone} required type='number' placeholder='Phone'/>

            </div>

            <div className='order-right'>

{/* <div className='left-sec'> */}
  <div className='order-title'>
    <h1>Cart Totals:</h1>
  </div>
  <div className='order-det'>
    <p>SubTotal</p>
    <p>${getTotalAmount()}</p>

  </div>
    <hr/>
  <div className='order-det'>
    <p>Dilevery Fee</p>
    <p>$2</p>

  </div>
    <hr/>
  <div className='order-det'>
    <b>Total</b>
    <p>${getTotalAmount()+2}</p>
    

  </div>
  <button type='submit'>ORDER NOW!

  {
                spinner ?

                <ClipLoader
                color={"white"}
                // loading={loading}
                // cssOverride={override}
                size={15}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
              :
              <></>
              }


  </button>



</div>
</div>        
</form>
</div>
// </div>
  )
}

export default Order
