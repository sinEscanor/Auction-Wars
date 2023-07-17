import React from 'react'
import { useSelector } from 'react-redux'
import {useEffect} from 'react'
import { GetAuction } from '../store/AuctionSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
var ongoingAuction:any =null;
const OnGoingAuction = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auctions = useSelector((state:any)=> state.Auction.auctions)
    
    
    useEffect(()=>{
         ongoingAuction = auctions.find((auction:any)=>{ return auction.staus === "Ongoing"})

        console.log(ongoingAuction)
    },[auctions])
    const navToAuctionRoom = ()=>{
        const fn = async()=>{
    
          await dispatch(GetAuction(ongoingAuction._id))
          navigate(`/auction/${ongoingAuction._id}`)
        }
        fn();
        
      }
  return (
    <>
    { ongoingAuction &&
        <div className='flex w-[60%] mx-10 gap-4 p-3 bg-zinc-900 border-white rounded-xl h-[320px]'>
      <img className='w-[45%] object-cover rounded-xl ' src="./testimg.jpg" alt="auction" />
      <div className='flex flex-col justify-between'>
        <div>
        <h1 className='text-4xl text-gray-300'>{ongoingAuction.title}</h1>
        {/* <p className='py-3 text-xl'>Toatal members</p> */}
        <p className=' py-2 text-xl'>Minimum bid: {ongoingAuction.initialBid}</p>
        <p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, dicta molestiae eligendi earum placeat voluptatibus, doloremque esse reiciendis quidem dolorum ut facere. Illo, </p>
        </div>
        <div className='pb-2'>
        <h1 className='text-3xl text-yellow-600 mb-2'>Join the battlefield</h1>
        
        <button  onClick={navToAuctionRoom} className='bg-gradient-to-r from-[#EC9F05] to-[#FF4E00]  rounded-lg p-2 px-4'> Place You Bid! </button>
        
        </div>
      </div>
    </div>
    }
    </>
    
  )
}

export default OnGoingAuction
