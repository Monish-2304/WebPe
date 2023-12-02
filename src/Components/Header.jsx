import React from 'react'
import { Link } from 'react-router-dom';
const Header = () => {
  return (
    <div className="flex justify-between items-center">
      <div>
      <img className="h-14 p-2 md:ml-4" alt='logo' src='https://img.freepik.com/free-photo/dollar-coin-clay-icon-cute-handmade-finance-creative-craft-graphic_53876-126143.jpg?w=740&t=st=1701501515~exp=1701502115~hmac=02b2089076489480a8a500c56da13749856338bbc7afd8724623be1e06715af1'/>
      </div>
      
        <ul className="flex gap-x-4 items-center mr-8">

            <li className="cursor-pointer hover:text-lg w-[100px] text-center"><Link to="/">Home</Link></li>
            <li className="cursor-pointer hover:text-lg  w-[100px] text-center"><Link to="/transactions">Transactions</Link></li>
            <li className="cursor-pointer hover:text-lg w-[100px] text-center"><Link to="/data">Data</Link></li>
        </ul>
   
    </div>
  )
}

export default Header;
