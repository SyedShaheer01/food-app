"use client"

import React, { useContext, useState } from 'react'
import Image from 'next/image'
import { assets } from '../asstes/assets'
import './login.css'
import axios from 'axios'
import Swal from 'sweetalert2'
import { StoreContext } from '../contex/page'
import { useRouter } from 'next/navigation'
import ClipLoader from "react-spinners/ClipLoader";





function Login({setLogin}) {

    const [currstate,setCurr]=useState('Login')
    const [spinner,setSpinner]=useState(false)
    const [data,setData]=useState({
      name:"",
      email:"",
      password:""
    })
    const router = useRouter()


    const changeHandle=(event)=>{
    let name = event.target.name
    let value = event.target.value

    setData(data=>({...data,[name]:value}))

    }
    
    const {setToken}=useContext(StoreContext)



const formSubmit= async(event)=>{
  event.preventDefault() 
  setSpinner(true)
  if(currstate === "Signup"){
    try {
      await axios.post("https://food-app-backend-gray.vercel.app/user/signup",data)
      .then(res=>{
        console.log("response",res)
        if(data.email === "admin@gmail.com"){
          router.push("https://food-app-admin-rouge.vercel.app/")
  
        }
        Swal.fire({
          title: "Good job!",
          text: res.data.message,
          icon: "success"
        });
        setSpinner(false)
        setToken(res.data.token)
        localStorage.setItem("token",res.data.token)
        setLogin(false)
      })

      
    } catch (error) {
      console.log(error)
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message
      });
      setSpinner(false)
      
    }
    
    
  }
  else{
    axios.post("https://food-app-backend-gray.vercel.app/user/login",data)
    .then(res=>{
      // console.log(res)
      if(data.email === "admin@gmail.com"){
        router.push("https://food-app-admin-rouge.vercel.app/")

      }
      setSpinner(false)
      setToken(res.data.token)
      localStorage.setItem("token",res.data.token)
      setLogin(false)

      Swal.fire({
        title: "Welcome!",
        text: res.data.message,
        icon: "success"
      });
      setSpinner(false)
    })
    .catch(err=>{
      console.log(err)
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.response.data.message
      });
      setSpinner(false)
    })
  }


}

  return (
    <div className='login-pop'>
      <div className='login-child'>

        <div className='login-pop-title'>

        <h1>{currstate}</h1>
        <Image className='cross' onClick={()=>setLogin(false)} src={assets.cross_icon} alt=''/>
      
        </div>
        <form onSubmit={formSubmit}>
        <div className='login-inputs'>

            {currstate === "Signup" ? <input onChange={changeHandle} value={data.name} name='name'  type='text' placeholder='Enter your name' />:<></>}
            
            <input  onChange={changeHandle} value={data.email}   type='email' name='email' placeholder='Enter your email'  required/>
            <input  onChange={changeHandle} value={data.password}   type='password' name='password' placeholder='Enter your password'  required/>

        </div>
            <button type='submit' className="login-btn">{currstate === 'Signup' ? 'create a account':'Login'}
              {
                spinner ?

                <ClipLoader
                color={"white"}
                // loading={loading}
                // cssOverride={override}
                size={13}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
              :
              <></>
              }

            </button>
            <div className='last-inp'>
              <div className='check-flex'>

            <input type='checkbox' required />
            <p>I Agreed?</p>
              </div>

              {  currstate === "Login" ?

            <p>create an account <span onClick={()=>setCurr("Signup")}>click here</span></p>
            
            :

            <p>Already have an account? <span onClick={()=>setCurr("Login")}>Login</span></p>
            }
            </div>
        </form>
      </div>
    </div>
  )
}

export default Login
