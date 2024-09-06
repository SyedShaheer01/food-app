"use client"

import MoonLoader from "react-spinners/MoonLoader";
import './verify.css'
import { useEffect} from 'react'
import Navbar from "../navbar/page";
import Footer from "../footer/page";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { useRouter } from 'next/navigation'
import { Suspense } from "react";


function Verify() {

    const searchParams = useSearchParams()
    let success= searchParams.get("success")
    let orderId= searchParams.get("orderId")
    const router = useRouter()

//    console.log(succes,orderId)

    const verifyPayment=async()=>{
       

            if(localStorage.getItem("token")){

                
                
                await axios.post("https://food-app-backend-ashy.vercel.app/api/order/verify",{success, orderId})
                .then(res=>{
                    console.log(res)
                    
            if(res.data.success){
                router.push('/myorders')
                
            }
            else{
            router.push('/')
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }
    }
    
    
    
    
useEffect(()=>{

    if(localStorage.getItem("token")){

        
        verifyPayment()
    }
    
   },[])



  return (
      
        <Suspense>
      <div>

        <Navbar/>
    <div className="verify-spin">
     <MoonLoader color='tomato' />

      
    </div>
    <Footer/>
    </div>
    </Suspense>
  )
}

export default Verify
