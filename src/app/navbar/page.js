"use client"

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
// import logo from '../asstes/logo.png'
import { assets } from '../asstes/assets'
import '../navbar/nav.css'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'
import { StoreContext } from '../contex/page';
import Swal from 'sweetalert2'
// import { usePathname } from 'next/navigation'










function Navbar({setLogin}) {
    // const pathname = usePathname()


    const {getTotalAmount,token,setToken}=useContext(StoreContext)

    const router = useRouter()


    const [active,setActive]=useState("home")
    useEffect(()=>{

    },[token])

    const logOut=()=>{

        localStorage.removeItem("token")
        setToken("") 
        router.push('/')
        }

        const cartPage=()=>{
        if(!localStorage.getItem("token")){
            
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "login in to continue"
              });      
            }
            else{
            router.push('/cartItems')

        }
            
            }

            const myOrder=()=>{
                router.push('/myorders')
            }
    
    return (
    <div className='container'>
        <div className='img-sec'>
        <Image onClick={()=>router.push('/')} className='logo' src={assets.logo} alt='logo'/>
        </div>
        <div className='list'>
            <ul>
                <Link href={'/'} className={active=== "home"? "active" :""} onClick={()=>setActive("home")}>Home</Link>
               <a href='#menu-explore' className={active=== "menu"? "active" :""} onClick={()=>setActive("menu")}> Menu</a>
                <a href='#mobile-app' className={active=== "app"? "active" :""} onClick={()=>setActive("app")}>Mobile-App</a>
                <a href='#contact' className={active=== "contact"? "active" :""} onClick={()=>setActive("contact")}>Contact-us</a>
            </ul>

        </div>


        <div className='icon-sec'>
            
            
            <Image className='search' src={assets.search_icon} alt=''/>

            { token &&

                
                <Image className={token ? "login-dot" :''} src={getTotalAmount() > 0 && token ? assets.selector_icon : "" } alt=''/>
            }
            
            
            <Image className='basket' onClick={cartPage} src={assets.basket_icon} alt=''/>

         
             {!token ?
             <button onClick={()=>setLogin(true)} className='btn'>Sign in</button>
             : 
             <div className='navbar-profile'>
               
                    <Image className='user-img' src={assets.profile_icon} alt=''/>
                    <ul className='nav-drop-down'>
                        <li onClick={myOrder}><Image src={assets.bag_icon} alt='' /><p>Orders</p></li>
                        <hr/>
                        <li onClick={logOut}><Image src={assets.logout_icon} alt=''/> <p>Logout</p></li>
                    </ul>

             </div>
             }

        </div>
        
      
    

    </div>
  )
}

export default Navbar
