import React from 'react'
import { GetAuction, GetAuctions } from '../../store/AuctionSlice'
import { useDispatch,useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { io } from 'socket.io-client'
const ProductInfo = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch();
  // useEffect(()=>{
  //   dispatch(GetAuction(id))
  // },[])
  let auction = useSelector((state:any)=> state.Auction.singleAuction)
  console.log(auction)
  const isLoading = useSelector((state:any)=> state.Auction.isLoading)
  const user = useSelector((state:any)=>state.Authenticate.user)
  console.log(auction.staus)
  const startAuction = ()=>{
    const updateAuctionStatus = async()=>{
      const config ={
        headers:{
          Authorization : `Bearer ${user.token}`
        }
      }
      const id = auction._id;
      const response = await axios.patch(`http://localhost:5000/api/auction/${id}`,{}, config)
      // console.log(user.token)
      // await dispatch(GetAuction(auction._id))
      // await dispatch(GetAuctions())
      // auction = response.data.auction

    }
    updateAuctionStatus()
    // const socket = io('http://localhost:5000/')

  }
  // {console.log(auction.bidders.length)}
  return (
    <div className='m-5 flex  gap-4 '>
      {isLoading? <p className='text-white text-3xl font-bold'>Loading..</p>:
      <>

       <img src="https://images.unsplash.com/photo-1517404215738-15263e9f9178?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80" className='w-[58%] h-[500px] object-cover rounded-lg' alt="1" />
       
       <div>
         <h1 className='text-3xl capitalize'>{auction.title}</h1>
         <p>{auction.description}</p>
         <div className='pb-6'>
             <p>Host : {auction.creater.name}</p>
             <p>Minimumbid : {auction.initialBid}</p>
         </div>
         {/* <input type="range" /> */}
         
         {/* <h1 className='text-2xl font-bold pb-4'>Current Highest bid: {auction.highestBid}$</h1> */}
         
         <div className='relative '>
           
           
      
           {
            auction.staus == 'Upcoming' && auction.creater._id == user.user._id 
            ? <button className='bg-amber-600 px-8 py-2 rounded-3xl my-3' onClick={startAuction}>Start the Auction</button>
              :auction.staus == "Upcoming" 
              ? <button className='bg-amber-600 px-8 py-2 rounded-3xl my-3' >Not started</button> 
                : auction.creater._id == user.user._id 
                  ?<button className='bg-amber-600 px-8 py-2 rounded-3xl my-3' >End Auction</button> 
                  : <>
                    
                    <button className='bg-amber-600 px-8 py-2 rounded-3xl my-3' onClick={()=> navigate(`/auction/${id}`)} >Go to the Auction</button>  
                  </> 
           }                 
         </div>
       </div>
       </>
      }
     
    </div>
  )
}

export default ProductInfo
