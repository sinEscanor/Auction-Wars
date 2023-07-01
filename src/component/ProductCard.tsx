import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { GetAuction } from '../store/AuctionSlice';
import { useDispatch } from 'react-redux';
interface Props {
  _id: string;
  title: string;
  description : string;
  photo: string;
  initialBid: number;
  creater: string
  startDate : Date;
  duration: number;
  bidders: any;
  status: string;
  highestBid: number;
  __v : number


}
const ProductCard = ({_id, title, description, photo,initialBid,creater, startDate,  duration, status, highestBid,__v }: Props) => {
  const auction = useSelector((state:any)=>state.Auction.auctions)
  const date = new Date(startDate)
  // console.log(_id)
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const navToAuctionRoom = ()=>{
    const fn = async()=>{

      await dispatch(GetAuction(_id))
      navigate(`/auction/${_id}`)
    }
    fn();
    
  }
  
  return (

    <div>
      <div className='bg-testImg w-[270px] h-[300px] bg-cover bg-center relative text-center '>
        <div className=' absolute bottom-0 left-0  bg-blur w-full  z-10 '>
        <h1 className='p-2'>Auctions Starts on {date.toDateString()}</h1>
        </div>
      </div>
      <div className='p-4 bg-gray-900'>
      <h1>{title}</h1>
      <span>Initial Bid - {initialBid}$</span>
      
      <button onClick={navToAuctionRoom} className='w-full rounded-full p-2 bg-amber-600'>Join The Auction</button>
      </div>
    </div>
  )
}

export default ProductCard
