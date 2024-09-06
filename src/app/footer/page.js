"use client"

import React from 'react'
import Image from 'next/image'
import { assets } from '../asstes/assets'
import '../footer/footer.css'


function Footer() {
  return (
    <div className='footer-parent' id='contact'>
        <div className='footer-sec'>
            <div className='footer-left'>
                <Image src={assets.logo} alt=''/>
                <p>Food provides essential nutrients for overall health <br/>Food provides essential nutrients for overall health<br/>Food provides essential nutrients for overall health</p>
                <div className='footer-icon'>

                <Image src = {assets.facebook_icon} alt=''/>
                <Image src = {assets.twitter_icon} alt=''/>
                <Image src = {assets.linkedin_icon} alt=''/>
                </div>

            </div>
            <div className='footer-center'>
                <h1>Company</h1>
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Dilevery</li>
                    <li>Privacy Policy</li>
                </ul>

            </div>
            <div className='footer-right'>
                <h1>Get In Touch</h1>
                <p>+112-0033-889</p>
                <span>contact@gmail.com</span>

            </div>

        </div>
      
    </div>
  )
}

export default Footer
