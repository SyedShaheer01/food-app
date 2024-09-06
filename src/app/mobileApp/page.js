import React from 'react'
import Image from 'next/image'
import { assets } from '../asstes/assets'
import '../mobileApp/mobile.css'


function Mobile() {
  return (
    <div className='mobile-parent' id='mobile-app'>
        <div className='mobile-sec'>

        <h1>For Better Experience Downlaod <br/> Tomato App</h1>
        </div>
        <div className='mobile-add'>
            <Image src={assets.play_store} alt=''/>
            <Image src={assets.app_store} alt=''/>
           
        </div>


      
    </div>
  )
}

export default Mobile
