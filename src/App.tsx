import { useState } from 'react'
import './App.css'
import Login from './component/pages/Login'
import Register from './component/pages/Register'
import Home from './component/pages/Home'
import {createBrowserRouter, Route, RouterProvider, createRoutesFromElements} from 'react-router-dom'
import Navbar from './component/Navbar'
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/' element={<Navbar/>}>
        <Route index element={<Home/>}></Route>
        <Route path='/auction/:id' element={<h1>Hi</h1>}></Route>
      </Route>
    </Route>
  ))

function App() {
  

  return (
    <div className=' text-white'>
    {/* <Home/> */}
    <RouterProvider router={router}/>
    </div>
  )
}

export default App
