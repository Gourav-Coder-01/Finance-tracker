import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import FinanceContextProvider from './context/FinanceContext.jsx'

createRoot(document.getElementById('root')).render(
 
    <BrowserRouter>
    <FinanceContextProvider>
    <App/>
    </FinanceContextProvider>
    </BrowserRouter>
 
)
