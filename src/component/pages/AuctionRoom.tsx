import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import {useEffect} from 'react'
import { io } from 'socket.io-client'
var socket:any;

const AuctionRoom = () => {
  // const { id } = useParams()
  
  // 
  const user = useSelector((state:any)=>state.Authenticate.user.user)

  let auction =  useSelector((state:any)=> state.Auction.singleAuction);
  const [currentHighestBid, setCurrentHighestBid] = useState(auction.highestBid)

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [enterdBid , setEnteredBid] = useState(0);
  // const [bcount , setBcount] = useState(0);
  
  useEffect(()=>{
    socket = io('http://localhost:5000/',{
      query:{
        roomId: auction._id,
        userId: user._id ,
        name:user.name
      }
    })
    console.log("Usr joined")
    // socket.emit("jjkkl", {info:"M"})
    // socket.emit('user-joined', {userId: user._id , name:user.name})
    socket.on('timer', (timer:any)=>{
      
      let h = Math.floor(timer/3600);

      let m = Math.floor((timer%3600)/60);

      let s= timer%60;
      setSeconds(s);
      setMinutes(m)
      setHours(h)

      if(h===0 && m===0 && s===0){
        socket.emit('auction-ended')
      }
    })
    // socket.on("newbidder", (biddersCount: number)=>{

    //   setBcount(biddersCount)

    // })
    socket.on('newhbid', (amount:number)=>{
      setCurrentHighestBid(amount);
      console.log(currentHighestBid);
    })
    // return () => {
    //   socket.disconnect();
    // };
  },[])

  
  
  const isLoading = useSelector((state:any)=> state.Auction.isLoading)
  

  // console.log(auction.staus)
  // const startAuction = ()=>{
  //   const updateAuctionStatus = async()=>{
  //     const config ={
  //       headers:{
  //         Authorization : `Bearer ${user.token}`
  //       }
  //     }
  //     const id = auction._id;
  //     const response = await axios.patch(`http://localhost:5000/api/auction/${id}`,{}, config)
  //     // console.log(user.token)
  //     // await dispatch(GetAuction(auction._id))
  //     // await dispatch(GetAuctions())
  //     // auction = response.data.auction

  //   }
  //   updateAuctionStatus()
  //   const socket = io('http://localhost:5000/')

  const PlaceBid = ()=>{
    if(enterdBid <= currentHighestBid) return;
    socket.emit('newBid', {amount:enterdBid, userId:user._id})
    
    // console.log(currentHighestBid)
  }
  const enterNewBidHandler = (e:any)=>{
    setEnteredBid(e.target.value)
  }
  
  return (
    <div className='m-5 flex  gap-4 '>
      {isLoading? <p className='text-white text-3xl font-bold'>Loading..</p>:
      <>

       <img src="https://images.unsplash.com/photo-1517404215738-15263e9f9178?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80" className='w-[58%] h-[500px] object-cover rounded-lg' alt="1" />
       
       <div>
         <h1 className='text-3xl capitalize'>{auction.title}</h1>
         
         {<p className='pb-4'> Current bidders: {auction.bidders.length}</p>}
         <p>{auction.description}</p>
         <div className='pb-6'>
             <p>Host : {auction.creater.name}</p>
             <p>Minimumbid : {auction.initialBid}</p>
         </div>
         <div className={`text-xl ${minutes<10 && hours ===0? 'text-red-500': 'text-blue-500'} `}> {hours} :{minutes}: {seconds} remaining</div>
         
         <h1 className='text-2xl font-bold pb-4'>Current Highest bid: {currentHighestBid}$</h1>
         
         <div className='relative '>
              <span className='absolute text-black top-[18px] left-2 text-lg font-semibold '>$</span>
              <input type="number" onChange={enterNewBidHandler} placeholder='Enter the amount' className='p-2 pl-5 text-black rounded-md mr-4 ' />
              <button className='bg-amber-600 px-8 py-2 rounded-3xl my-3' onClick={PlaceBid} >Bid</button>  
                 
         </div>
       </div>
       </>
      }
     
    </div>
  )
}

export default AuctionRoom
