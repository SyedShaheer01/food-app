"use client"

import { useEffect, useState } from "react";
import Main from "./main/page";
import Login from "./login/page";
// import Navbar from "./navbar/page";
// import Banner from "./banner/page";
import Footer from "./footer/page";
import { usePathname } from "next/navigation";
// import ProviderContext from "./contex/page";


export default function Home() {
  const [login, setLogin] = useState(false)

  const pathname = usePathname()

  useEffect(()=>{

    if(localStorage.getItem("token")){

      if(pathname!=='/cartItems' && pathname!=='/order' && pathname!=='/' && pathname!== '/myorders'){
        window.location="/cartItems"
      }
      
    }
    // console.log(pathname)
    



  },[])

  return (
    
     <div>
      {
        login === true ?
        <div>
        <Login login={login} setLogin={setLogin}/>
        </div>
        : <></>
      }

    <div className="app">

    <Main login={login} setLogin={setLogin}/>
    
    </div>
    <div >

    </div>
    <Footer/>
     </div>
  
  );
}
