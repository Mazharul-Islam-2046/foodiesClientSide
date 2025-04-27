import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import './App.css'
import Navbar from './SharedComponents/Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import CartBadge from './SharedComponents/Components/CartBadge'

function App() {

  return (
    <>
      <Navbar/>
      <Outlet/>
      <ReactQueryDevtools initialIsOpen={false} />
      <CartBadge/>
    </>
  )
}

export default App
