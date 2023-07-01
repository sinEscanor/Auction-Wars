import React from 'react'
import Auctions from '../Auctions'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const Home = () => {
  const navigate = useNavigate()
  const user = useSelector((state: any)=> state.Authenticate.user)
  useEffect(()=>{
    if(!user){
      navigate('/login');
    }
  },[user])
  
  return (
    <div>
      {/* <Navbar/> */}
      <div className='text-[40px] py-16'>
      <h1>Get ready to <span className='text-amber-500'>bid</span>,</h1>
      <h1> ignite the thrill of <span className='text-amber-500'>auctions!</span></h1>
      </div>
      <Auctions/>
    </div>
  )
}

export default Home
