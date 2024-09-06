"use client"

import { useContext, useState } from 'react'
import '../FoodItem/foodItem.css'
import Image from 'next/image'
import { assets } from '../asstes/assets'
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { StoreContext } from '../contex/page';



function FoodItem({id,name,image,price,description}) {

  const {cartItems,addToCart,removeCart,token}=useContext(StoreContext)
  return (
    <div className='food-con'>
      <div className='food-image'>
        <img className='food-item-image' src={image} alt="" />

      </div>
      <div className='add'>

        
        

      
        {cartItems[id] > 0 && token ? 
        
        <div className='food-cart' >

<FaMinus onClick={ ()=> removeCart(id)} className='minus' color='red' size={24} />
      <span>{cartItems[id]}</span>
      
      <FaPlus onClick={()=>addToCart(id)} className='plus' color='green' size={24} />
      </div>
      :
      <Image onClick={()=>addToCart(id)} src={assets.add_icon_white} alt=''/>
        }

      
      </div>
      <div className='food-info'> 

      <div className='food-rating'>
 
        <p>{name}</p>
        <Image src={assets.rating_starts} alt=''/>

      </div>
      <p className='food-desc'>{description}</p>
      <p className='food-price'>${price}</p>


      </div>
      
    </div>
  )
}

export default FoodItem
