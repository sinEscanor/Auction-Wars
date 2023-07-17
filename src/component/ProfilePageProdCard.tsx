import React from 'react'
import img from './testimg.jpg'
const ProfilePageProdCard = ({product}:any) => {
  return (
    <div className=' flex gap-3 w-[40vw] bg-zinc-800 rounded-md '>
      <img src={img} alt="" className='w-[50%] object-cover  rounded-md h-[25vh]' />
      <div>
      <h1 className='text-3xl text-yellow-500'>{product.title}</h1>
      <h3 className='text-2xl'>Base price: $ {product.initialBid}</h3>
      <p className='mt-4 text-lg'>Status: {product.status}</p>
      {product.status == 'Sold' ? <p className=''>Buyer: {product.winner}</p>: <h1></h1>}
      </div>
      
      
         
    </div>
  )
}

export default ProfilePageProdCard
