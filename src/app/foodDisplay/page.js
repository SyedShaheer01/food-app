"use client"

import { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../contex/page'
import FoodItem from '../FoodItem/page'
import '../foodDisplay/foodDisplay.css'
import MoonLoader from "react-spinners/MoonLoader";




function FoodDisplay({items}) {

    const {food_list}= useContext(StoreContext)
    const[loader,setLoader]=useState(true)

    useEffect(()=>{
      
      setTimeout(()=>{
        setLoader(false)

      },2000)
      

    },[])



  return (
      <div className='food-display'>
        <h1>Top dishes near you!</h1>

        {
          loader?
          
          <div className='loader'>
            
          <MoonLoader color='tomato' />
          
          
          </div>

          :

        <div className='food-list'>

        { food_list && food_list.map((v, i)=>{
          // {console.log(items,v.category)}
          if(items === "All" || items === v.category ){
            return <FoodItem  key={i} id={v._id} name={v.name} image={v.image} description={v.description} price={v.price}/>
              
          }
          
            })}
        </div>
      
    }
      </div>
    )
  }
  
  export default FoodDisplay
  