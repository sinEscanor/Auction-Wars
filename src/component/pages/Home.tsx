import React from 'react'
import Auctions from '../Auctions'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import OnGoingAuction from '../OnGoingAuction'
import { useNavigate } from 'react-router-dom'
// import { useSelector } from 'react-redux'


const Home = () => {
  const navigate = useNavigate()
  const user = useSelector((state: any)=> state.Authenticate.user)
  const auctions = useSelector((state:any)=> state.Auction.auctions)
  
  useEffect(()=>{
    if(!user){
      navigate('/login');
    }
  },[user])
  
  return (
    <div>
      {/* <Navbar/> */}
      <div className='flex justify-between mx-10 my-20 '>
        <div className='text-[40px] py-16'>
          <h1>Get ready to <span className='text-amber-500'>bid</span>,</h1>
          <h1> ignite the thrill of <span className='text-amber-500'>auctions!</span></h1>
        </div>
        <OnGoingAuction/>
      </div>
      <Auctions/>
    </div>
  )
}

export default Home
