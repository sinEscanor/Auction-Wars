import React, { useEffect, useState } from 'react'
import axios from 'axios'
import profilepic from '../profile.png'
import { useSelector } from 'react-redux'
import { UserActions } from '../../store/UserSlice'
import { useDispatch } from 'react-redux'
import PaginationContainer from '../PaginationContainer'
import { Link } from 'react-router-dom'
const AJK = [
  {
    title: "Prod 1",
    price:40
  },
  {
    title: "Prod 2",
    price:40
  },
  {
    title: "Prod 3",
    price:40
  },
  {
    title: "Prod 4",
    price:40
  },
  {
    title: "Prod 5",
    price:40
  },
  {
    title: "Prod 6",
    price:40
  },
  {
    title: "Prod 7",
    price:40
  },

]

const ProfilePage = () => {
  const token = useSelector((state : any)=>state.Authenticate.user.token)
  // console.log(token)
  const [user, setUser]:any = useState({})
  const [auctionArray, setAuctionArray]:any = useState(null)
  useEffect(()=>{
    const getUser = async()=>{
      console.log(token)
      const config ={
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      const response = await axios.get("https://auction-wars-backend.vercel.app/api/auth/", config);
      setUser(response.data.user)
      setAuctionArray(response.data.user.postedAuctions)
      // console.log(response)
    }
    getUser();
  },[])

  const PostedAuctionsHandler = ()=>{
    setAuctionArray(user.postedAuctions)
  }
  const AuctionsWonHandler = ()=>{
    setAuctionArray(user.purchasedItems)
  }
  const dispatch = useDispatch()
  const Logout = ()=>{
    localStorage.removeItem('userInfo')
    dispatch(UserActions.logout())
  }
  return (
    <div className='flex pl-16 flex-col md:flex-row gap-10 '>
        <div className='md:w-[40%] flex flex-col items-center pr-10 '>
            <img src={profilepic} alt="Pro" className='w-[150px] my-4 object-fill  bg-gray-700 rounded-[150%] h-[150px]' />
            <h1 className='text-4xl text-gray-500'>{user.name}</h1>
            <h3 className='text-3xl'>{user.email}</h3>
            <h3>{user.address}</h3>
            {/* <h2 >Products Auctioned: X</h2>
            <h2>Products Sold: Y</h2> */}
            <div className='my-2'>
            <p className='py-2 px-10 cursor-pointer bg-zinc-800 rounded  my-2' onClick={PostedAuctionsHandler}>Auction Hosted</p>
            <p className='py-2 px-10 cursor-pointer  bg-zinc-800  rounded  ' onClick={AuctionsWonHandler}>Auction Won</p>
            </div>
            <Link to={'/login'}><button onClick={Logout} className='bg-amber-600 mt-3 rounded-lg p-2 px-4'> Logout </button></Link>
            
        </div>
        
        <div className='w-full md:w-[60%]'>

        {auctionArray&&<PaginationContainer productArray={auctionArray}/>}
        </div>
        
      
    </div>
  )
}

export default ProfilePage
