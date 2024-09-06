"use client"

import React from 'react'
import './navbar.css'
import Image from 'next/image'
import { assets } from '@/app/assets/assets'
import { useRouter } from 'next/navigation'


function Navbar() {
  const router = useRouter()


  const logOut=()=>{
    localStorage.removeItem("token")
    router.push('https://food-app-one-pearl.vercel.app/')
  }
  return (
    <div className='navbar'>
        <Image className='logo' src={assets.logo} alt=''/>
        <button onClick={logOut} className='logout-btn'>Logout</button>      
    </div>
  )
}

export default Navbar
