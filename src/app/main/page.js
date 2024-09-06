"use client"

import { useEffect, useState,useContext } from 'react'
import Navbar from '../navbar/page'
import Banner from '../banner/page'
import Menu from '../menu/page'
import FoodDisplay from '../foodDisplay/page'
import Mobile from '../mobileApp/page'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
  




function Main({login,setLogin}) {

  const [items, setItems] = useState("All")



  return (
    <div className='main-parent'>
        <ToastContainer/>
      <div>
        <Navbar login={login} setLogin={setLogin} />
      {/* {
        login === true ?
        <div>
        <Login login={login} setLogin={setLogin}/>
        </div>
        : <></>
      } */}
        <Banner />
      </div>
      <div>

      </div>
      <div>
        <Menu items={items} setItems={setItems} />

      </div>
      <div>

        <FoodDisplay items={items}/>
      </div>
      <div>
        <Mobile/>
      </div>
      <div>
        {/* <Footer/> */}
      </div>

    </div>
  )
}

export default Main
