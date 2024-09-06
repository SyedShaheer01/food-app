"use client"

import{ useEffect, useState } from 'react'
import Navbar from '../navbar/page'
import Footer from '../footer/page'
import { StoreContext } from '../contex/page';

import { useContext } from 'react'
import './cart.css'
// import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ToastContainer } from 'react-toastify';
import { usePathname } from 'next/navigation'
import 'react-toastify/dist/ReactToastify.css';
import MoonLoader from "react-spinners/MoonLoader";









function CartItem() {
  const {cartItems,food_list,removeCart,getTotalAmount,token,getCartItem}=useContext(StoreContext)
  const router = useRouter()
  const pathname = usePathname()
  const[loader,setLoader]=useState(true)

  useEffect(()=>{

    if(localStorage.getItem("token")){
      
      if(pathname!=='/cartItems' && pathname!=='/order' && pathname!=='/'){
        window.location="/cartItems"
      }
    }
    else{
         
      window.location='/'
       
    }

    if(getCartItem()){
      setLoader(false)
    }
    
    
    
  },[])

 

  
  return (
    <div className='carts-parent'>
      <div className='cart-nav'>


        <Navbar/>
      </div>
      
        {loader ?
        
        
            <div className='loader'>
            
            <MoonLoader color='tomato' />
            
            
            </div>
        
        :
        <div>
          

          <ToastContainer/>
          
        <div className='cart'>
          
          <div className='cart-items'>
            <span>Items</span>
            <span>Title</span>
            <span>Price</span>
            <span>Quantity</span>
            <span>Total</span>
            <span>remove</span>

          </div>
          <hr/>
    

        {food_list.map((v,i)=>{
          if(cartItems[v._id] > 0){
            return(
              
              <div key={i}>
                

              <div className='cart-items cart-item-items'>
              
              <img src={v.image} alt=''/>
              
              <p>{v.name}</p>

              
              <p>${v.price}</p>
          
              <p>{cartItems[v._id]}</p>

              <p>${v.price * cartItems[v._id]}</p>
              <p className='cross-icon' onClick={()=>removeCart(v._id)}>x</p>
              </div>
              <hr/>
              </div>
            
            )
          
          }
          
        })}
        
        </div>
        
        <div className='both-sec'>


          <div className='left-sec'>
            <div className='promo-title'>
              <h1>Cart Totals</h1>
            </div>
            <div className='promo-det'>
              <p>SubTotal</p>
              <p>${getTotalAmount()}</p>

            </div>
              <hr/>
            <div className='promo-det'>
              <p>Dilevery Fee</p>
              <p>$2</p>

            </div>
              <hr/>
            <div className='promo-det'>
              <b>Total</b>
              <p>${getTotalAmount()+2}</p>
            
              

            </div>
            <button onClick={()=>router.push('/order')}>PROCEED TO CHECKOUT</button>
          </div>
          <div className='right-sec'>

            <div className='right-det'>
              <p>If you have a promo code, Enter here</p>
            </div>
            <div className='right-inp'>
              <input type='text' placeholder='Enter Promo Code'/>
              <div>
              <button>Submit</button>
              </div>
            </div>
          </div>

        </div>
        <div>

        

        <Footer/>
        </div>
        </div>

      

      }
              
      
     </div>
  )
}

export default CartItem
