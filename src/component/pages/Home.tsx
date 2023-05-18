import React from 'react'
import Navbar from '../Navbar'
import ProductCard from '../ProductCard'
import Auctions from '../Auctions'


const Home = () => {
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
