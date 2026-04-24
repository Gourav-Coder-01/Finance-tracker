import React from 'react'
import { FaRupeeSign } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='p-2 shadow-2xl flex justify-between bg-green-700 items-center'>
            <FaRupeeSign className='text-3xl rounded-2xl shadow-[0_0_10px_10px_lightgreen] p-1'/>
            <div className='hidden sm:block'>
            <ul className='flex gap-4 items-center font-medium'>
                  <li><NavLink to='/'>Dashboard</NavLink></li>
                  <li><NavLink to='/transactions'>Transactions</NavLink></li>
                  <li><NavLink to='/income'>Income</NavLink></li>
                  <li><NavLink to='/expenses'>Expenses</NavLink></li>   
            </ul>
            </div>
            <IoMenu className='sm:hidden block' />
    </nav>
  )
}

export default Navbar
