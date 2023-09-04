import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import AuctionEnded from '../AuctionEnded'
import { Alert, Snackbar } from '@mui/material'
import Backdrop from '@mui/material/Backdrop';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader';

import {useEffect} from 'react'
import { io } from 'socket.io-client'
var socket:any;
interface Bid{
  amount:number,
  bidder:string
}

const AuctionRoom = () => {
  const navigate = useNavigate();
  

  const user = useSelector((state:any)=>state.Authenticate.user.user)

  let auction =  useSelector((state:any)=> state.Auction.singleAuction);
  const [currentHighestBid, setCurrentHighestBid] = useState(auction.highestBid)
  const [currentBidder, setCurrentBidder] = useState('')
  const [isEnded, setIsEnded] = useState(false)
  const [validBid, setValidBid] = useState(true)

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [enterdBid , setEnteredBid] = useState(0);
  
  useEffect(()=>{
    socket = io('https://auction-wars-backend.vercel.app/',{
      query:{
        roomId: auction._id,
        userId: user._id ,
        name:user.name
      }
    })
    console.log("Usr joined")
    socket.on('timer', (timer:any)=>{
      
      let h = Math.floor(timer/3600);

      let m = Math.floor((timer%3600)/60);

      let s= timer%60;
      setSeconds(s);
      setMinutes(m)
      setHours(h)

      if(h<=0 && m<=0 && s<=0){
        socket.emit('auction-ended')
        setTimeout(()=>{
          navigate('/')
        },5000)
        setIsEnded(true)
      }
    })

    socket.on('newhbid', (amount:number, bidder:string)=>{
      setCurrentHighestBid(amount);
      setCurrentBidder(bidder)
      console.log(currentHighestBid);
    })
    socket.on('ended',()=>{
      console.log('ended 1')
      setIsEnded(true);
    })

  },[])


  
  const isLoading = useSelector((state:any)=> state.Auction.isSingleAuctionLoading)
  

  // console.log(auction.staus)
  // const startAuction = ()=>{
  //   const updateAuctionStatus = async()=>{
  //     const config ={
  //       headers:{
  //         Authorization : `Bearer ${user.token}`
  //       }
  //     }
  //     const id = auction._id;
  //     const response = await axios.patch(`https://auction-wars-backend.vercel.app/api/auction/${id}`,{}, config)
  //     // console.log(user.token)
  //     // await dispatch(GetAuction(auction._id))
  //     // await dispatch(GetAuctions())
  //     // auction = response.data.auction

  //   }
  //   updateAuctionStatus()
  //   const socket = io('https://auction-wars-backend.vercel.app/')

  const PlaceBid = ()=>{
    if(enterdBid <= currentHighestBid) return setValidBid(false) ;
    validBid && setCurrentHighestBid(enterdBid);
    validBid && socket.emit('newBid', {amount:enterdBid, userId:user._id})
    
  }
  const handleClose = ()=>{
    setValidBid(true)
  }
  const backdropClose =()=>{
    // setIsEnded(false)
    console.log('Close')
  }
  const enterNewBidHandler = (e:any)=>{
    setEnteredBid(e.target.value)
  }
  
  return (
    <div className='m-5 flex-col md:flex-row flex items-center  gap-4 '>
      {/* {isEnded && <div className='bg-[#2e302f57] z-50'> <AuctionEnded auction={auction} amount={currentHighestBid} bidder={currentBidder}></AuctionEnded></div>} */}
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isEnded}
        onClick={backdropClose}
      >
        {/* <CircularProgress color="inherit" /> */}
        {/* <h1>Hi...</h1> */}

        <AuctionEnded auction={auction} amount={currentHighestBid} bidder={currentBidder}></AuctionEnded>
      </Backdrop>
        {!validBid && <Snackbar  open={!validBid} autoHideDuration={3000} onClose={handleClose} >
        <Alert onClose={handleClose} variant='filled' severity="error" sx={{ width: '100%' }}>
          Enterd bid is less than current highestBid!
        </Alert>
      </Snackbar>}
       <img src={auction.photo} className='w-[58%] h-[500px] object-cover rounded-lg' alt="1" />
       
       <div>
         <h1 className='text-3xl capitalize'>{auction.title}</h1>
         
         {<p className='pb-4'> Current bidders: {auction.bidders.length}</p>}
         <p>{auction.description}</p>
         <div className='pb-6'>
             <p>Host : {auction.creater.name}</p>
             <p>Minimumbid : {auction.initialBid}</p>
         </div>
         <div className={`text-xl ${minutes<1 && hours ===0? 'text-red-500': 'text-blue-500'} `}> {hours} :{minutes}: {seconds} remaining</div>
         
         <h1 className='text-2xl font-bold pb-4'>Current Highest bid: {currentHighestBid}$</h1>
         
         {
          auction.creater._id == user._id ? 
          <button className='bg-amber-600 px-8 py-2 rounded-3xl my-3' onClick={()=>{setIsEnded(true); socket.emit('auction-ended')}} >End Auction</button>:
          <div className='relative '>
              <span className='absolute text-black top-[18px] left-2 text-lg font-semibold '>$</span>
              <input type="number" onChange={enterNewBidHandler} placeholder='Enter the amount' className='p-2 pl-5 text-black rounded-md mr-4 ' />
              <button className='bg-amber-600 px-8 py-2 rounded-3xl my-3' onClick={PlaceBid} >Bid</button>                   
         </div>

         }
         
       </div>

    </div>
  )
}

export default AuctionRoom


