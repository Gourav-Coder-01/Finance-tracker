import React from 'react'
import { FaRupeeSign } from "react-icons/fa";
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='p-2 shadow-2xl flex justify-between'>
            <FaRupeeSign className='text-3xl rounded-2xl shadow-[0_0_10px_10px_lightgreen] p-1'/>
            <ul className='flex gap-4 items-center font-medium'>
                  <li><NavLink to='/'>Dashboard</NavLink></li>
                  <li><NavLink to='/transactions'>Transactions</NavLink></li>
                  <li><NavLink to='/income'>Income</NavLink></li>
                  <li><NavLink to='/expenses'>Expenses</NavLink></li>   
            </ul>
      
    </nav>
  )
}

export default Navbar
