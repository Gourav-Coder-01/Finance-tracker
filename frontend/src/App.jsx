import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'
import Income from './pages/Income'
import Expense from './pages/Expense'

const App = () => {
  return (
      <div className=' h-screen bg-green-200'>
    <div className='w-[95%] mx-auto'>
      <Navbar/>
      <Routes>
            <Route path='/' element={<Dashboard/>}/>
            <Route path='/transactions' element={<Transactions/>}/>
            <Route path='/income' element={<Income/>}/>
            <Route path='/expenses' element={<Expense/>}/>
      </Routes>
    </div>
      </div>
  )
}

export default App
