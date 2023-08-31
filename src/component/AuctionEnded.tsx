import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
interface Bid{
  auction:any,
  amount:number,
  bidder:string
}
const AuctionEnded: React.FC<Bid> = ({auction,amount, bidder}) => {
  const user = useSelector((state:any)=>state.Authenticate.user.user)
  if(auction.creater._id == user._id) {
    return (
      <div className='w-[30vw] h-[30vh] flex justify-center items-center overflow-x-hidden z-50 bg-zinc-800'>
         <div>
          <h1 className='text-2xl text-green-600'>Auction Ended</h1>
          <h1>Status: {bidder!=''? 'Sold':'Not Sold'}</h1>
          <h1>Amount: {bidder!=''? amount +'$':'Not Sold'}</h1>

          <h1>Back to homepage<Link to={'/'}><span className='text-blue-500 hover:underline'>here</span></Link></h1>
        </div>
      </div>)
    }
  
  return (
    <div className='w-[30vw] h-[30vh] flex justify-center items-center overflow-x-hidden z-50 bg-zinc-800'>

      {bidder!=user._id
        ?
        <div>
          <h1  className='text-2xl text-green-600'>Auction Ended</h1>
          <h1>ThanYou for participating</h1>
          <h1>Better Luck next time</h1>
          <h1>See more acutions<Link to={'/'}><span className='text-blue-500 hover:underline'>here</span></Link></h1>
        </div>
        : 
        <div>
          <h1  className='text-2xl text-green-600'>Auction Ended</h1>
          <h1>Congratulation, You won!</h1>
          <h1>See more acutions<Link to={'/'}><span className='text-blue-500 hover:underline'>here</span></Link></h1>
        </div>}
      
    </div>
  )
}

export default AuctionEnded
