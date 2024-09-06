"use client"

import React from 'react'
import './sideBar.css'
import Image from 'next/image'
import { assets } from '@/app/assets/assets'
// import Link from 'next/link'
// import { useRouter } from 'next/navigation'



function SideBar({ detail, setDetail }) {
  // const router = useRouter()

  return (
    <div className='side-bar'>
      <div className='side-cont'>


        <div onClick={() => { setDetail(prev => prev === "add" ? "" : "add") }} className={detail === "add" ? "active" : 'side-options'}>
          <Image src={assets.add_icon} alt='' />
          <span>Add Items</span>
        </div>

        <div onClick={() => { setDetail(prev => prev === "list" ? "" : "list") }} className={detail === "list" ? "active" : 'side-options'}>

          <Image src={assets.order_icon} alt='' />
          <span>List Items</span>
        </div>

        <div onClick={() => { setDetail(prev => prev === "orders" ? "" : "orders") }} className={detail === "orders" ? "active" : 'side-options'}>

          <Image src={assets.order_icon} alt='' />
          <span>Orders</span>
        </div>




      </div>
    </div>
  )
}

export default SideBar
