"use client"

import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
// import { food_list } from '../asstes/assets'
import Swal from 'sweetalert2'
import 'react-toastify/dist/ReactToastify.css';




export const StoreContext = createContext(null)

const ProviderContext= (props)=>{

    const [cartItems, setCartItems]=useState({})
    const [token, setToken]=useState("")
    const [food_list, setFood] = useState([])

    // useEffect(()=>{
    //     console.log(token)

    // },[token])


    const addToCart = async (itemId)=>{

        
        if(token && !cartItems[itemId]){
            setCartItems((prev)=>({...prev,[itemId]:1}))
            
        }
        else{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
            
        }
        if(token){
             
            await axios.post("https://food-app-backend-ashy.vercel.app/api/cart/addCart",{itemId},{headers:{token}})
            .then(res=>{
                toast.success("product added to cart",{
                    autoClose:2000
                })
                console.log(res)

            })

            .catch(err=>{
                console.log(err)
            })


        }

        else{
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "login in to continue"
              });      
            
            }
        // console.log(itemId)

    }

    const removeCart= async(itemId)=>{
        if(token){

            
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
            await axios.post("https://food-app-backend-ashy.vercel.app/api/cart/removeCart",{itemId},{headers:{token}})
            .then(res=>{
                toast.success("product deleted from cart",{
                    autoClose:2000
                })
                console.log(res)
                
        })

        .catch(err=>{
            console.log(err)
        })

        
    }

    }


    const getCartItem= async(token)=>{
        if(token){

            
            await axios.post("https://food-app-backend-ashy.vercel.app/api/cart/getCart",{},{headers:{token}})
            .then(res=>{
                // console.log(res)
                setCartItems(res.data.cartData)
            })
            
            .catch(err=>{
                console.log(err)
            })
        }
    }

    const getTotalAmount = () =>{

        let totalAmount = 0

        for(const item in cartItems){

            if(cartItems[item] > 0){

                 let itemInfo = food_list.find((product) => product._id === item)
                 totalAmount += itemInfo && itemInfo.price*cartItems[item]
                //  console.log(itemInfo)
                 
                 
                 
                 
                }
                
                
            }
            return totalAmount;
    }
    
    const fetchFood= async()=>{
        
        await axios.get("https://food-app-backend-ashy.vercel.app/api/list")

        .then(res=>{
            console.log(res)
            setFood(res.data.data)
        })
        .catch(err=>{
            console.log(err)

        })

    }

  

    useEffect(()=>{

       async function load(){
            
                   await fetchFood()
                    if(localStorage.getItem("token")){
                        setToken(localStorage.getItem("token"))
                        await getCartItem((localStorage.getItem("token")))
                    }
        


        }
        load()
        // console.log(cartItems)
         
 
     },[token])
     



   

    const contextValue={
        getTotalAmount,
        food_list,
        setFood,
        cartItems,
        setCartItems,
        addToCart,
        removeCart,
        token,
        setToken,
        getCartItem
      


    }

    return(

        <StoreContext.Provider value={contextValue}>
            {props.children}

        </StoreContext.Provider>
    )
}
export default ProviderContext

