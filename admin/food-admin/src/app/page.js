"use client"

import { useState } from "react";
import Add from "./components/add/page.js";
import Navbar from "./components/navbar/page.js";
import SideBar from "./components/sideBar/page.js";
import List from "./components/list/page.js";
import Order from "./components/orders/page.js";


export default function Home() {

  const [detail,setDetail]=useState("add")
  return (
    <div>
      <Navbar/>
      <hr/>
      <div className="app-content">
        
        <SideBar detail={detail} setDetail={setDetail}/>

        {detail === "add" && <Add/> || detail === "list" && <List/> || detail === "orders" && <Order/> }
      </div>
    </div>
  );
}
