"use client"

import React from 'react'
import '../menu/menu.css'
import Image from 'next/image'

import { menu_list } from '../asstes/assets'

function Menu({items,setItems}) {
  return (
    <div className='m-container' id='menu-explore'>
    
        <h1>Explore Our Menu</h1>
        <p className='menu-text'> choose the best dishes you want our every dish is very special <br/> select your dish now explore the menu!</p>
      

      <div className='menu'>

            
            {
              menu_list.map((v,i)=>{
                return(
                  
                  <div onClick={()=>{setItems(prev=> prev === v.menu_name ? "All" : v.menu_name)}} key={i} className='items'>
              <Image className={items === v.menu_name ? "active-item" : ""} src={v.menu_image} alt=''/>
             <p >{v.menu_name}</p>
        </div>
          )
          })
          }

        
      </div>
      <hr/>
    </div>
  )
}

export default Menu
