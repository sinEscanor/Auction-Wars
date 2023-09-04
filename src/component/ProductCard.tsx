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
      navigate(`/product/${_id}`)
    }
    fn();
    
  }
  // 'https://auction-wars-backend.vercel.app/3c8f9be0-2845-49b1-9f22-14becbf7c817.png'
  return (

    <div>
      
      {/* <div className={`bg-[url('https://auction-wars-backend.vercel.app/3c8f9be0-2845-49b1-9f22-14becbf7c817.png')] w-[270px]  h-[280px] rounded-md bg-cover bg-center relative text-center `}>
        <div className=' absolute bottom-0 left-0  bg-blur w-full  z-10 '>
        <h1 className='p-2'>Auctions Starts on {date.toDateString()}</h1>
        </div>
      </div> */}
      <div className='relative'>

      <img src={photo} className='w-[270px]   h-[280px] rounded-md bg-cover bg-center relative text-center' alt="jk" ></img>
      <div className=' absolute bottom-0 left-0  bg-blur w-full  z-10 '>
        <h1 className='p-2'>Auctions Starts on {date.toDateString()}</h1>
        </div>
      </div>
      <div className='p-4 w-[270px] bg-zinc-800'>
      <h1 className='text-xl'>{title}</h1>
      <span>Initial Bid - {initialBid}$</span>
      
      <button onClick={navToAuctionRoom} className='w-full mt-1 rounded-full p-2 bg-gradient-to-r from-[#EC9F05] to-[#FF4E00]'>Join The Auction</button>
      </div>
    </div>
  )
}

export default ProductCard
