
import { useSelector } from 'react-redux'
import {useEffect} from 'react'
import { GetAuction } from '../store/AuctionSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';



var ongoingAuction:any =null;
const OnGoingAuction = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auctions = useSelector((state:any)=> state.Auction.auctions)
    // const isLoading = useSelector((state:any)=> state.Auction.isSingleAucLoading)
    
    
    useEffect(()=>{
         ongoingAuction = auctions.find((auction:any)=>{ return auction.staus === "Ongoing"})

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
    {  ongoingAuction ?
        <div className='flex md:w-[60%] mx-2 lg:mx-10 gap-4 p-3 bg-zinc-900 border-white rounded-xl h-[320px]'>
      <img className='w-[45%] object-cover rounded-xl ' src={ongoingAuction.photo} alt="auction" />
      <div className='flex flex-col justify-between'>
        <div>
        <h1 className='text-2xl lg:text-4xl text-gray-300'>{ongoingAuction.title}</h1>
        <p className=' py-2 text-lg lg:text-xl'>Minimum bid: {ongoingAuction.initialBid}</p>
        <p className='text-xs lg:text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, dicta molestiae eligendi earum placeat voluptatibus, doloremque esse reiciendis quidem dolorum ut facere. Illo, </p>
        </div>
        <div className='pb-2'>
        <h1 className=' text-xl lg:text-3xl text-yellow-600 mb-2'>Join the battlefield</h1>
        
        <button  onClick={navToAuctionRoom} className='bg-gradient-to-r from-[#EC9F05] to-[#FF4E00]  rounded-lg p-2 px-4'> Place You Bid! </button>
        
        </div>
      </div>
    </div>: <div className='flex md:w-[60%] mx-3 md:mx-10 gap-4 p-3 bg-zinc-900 border-white  text-2xl text-zinc-500 rounded-xl h-[320px] justify-center items-center'>No Ongoing Auction right now :(</div>
    }
    </>
    
  )
}

export default OnGoingAuction
