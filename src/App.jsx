import { useState } from 'react'
import './App.css'
import Home from './Pages/Home'
import Transactions from './Pages/Transactions'
import Data from './Pages/Data'
import { Outlet} from 'react-router-dom'
import Header from './Components/Header'


function App() {
   return (
    <div className=" sm:w-full p-2 bg-[#CAE2EE] min-h-screen">
    <Header/>
    <Outlet/>
    </div>
  )
}


export default App
