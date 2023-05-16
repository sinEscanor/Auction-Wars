import React from 'react'

const ProductCard = () => {
  return (
    <div>
      <div className='bg-testImg w-[270px] h-[350px] bg-cover bg-center relative text-center '>
        <div className=' absolute bottom-0 left-0  bg-blur w-full  z-10 '>
        <h1 className='p-2'>Auctions Starts in 5 Days</h1>
        </div>
      </div>
      <div className='p-4 bg-gray-900'>
      <h1>Test Product 1</h1>
      <span>Initial Bid - 10$</span>
      <button className='w-full p-2 bg-amber-600'>Join The Auction</button>
      </div>
    </div>
  )
}

export default ProductCard
