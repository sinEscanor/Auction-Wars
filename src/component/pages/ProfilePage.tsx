import React from 'react'
import profilepic from '../profile.png'
import { UserActions } from '../../store/UserSlice'
import { useDispatch } from 'react-redux'
import PaginationContainer from '../PaginationContainer'
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
  const dispatch = useDispatch()
  const Logout = ()=>{
    localStorage.removeItem('userInfo')
    dispatch(UserActions.logout())
  }
  return (
    <div className='flex pl-16 gap-10 '>
        <div className='w-[40%] flex flex-col items-center pr-10 '>
            <img src={profilepic} alt="Pro" className='w-[150px] my-4 object-fill  bg-gray-700 rounded-[150%] h-[150px]' />
            <h1 className='text-4xl text-gray-500'>Profile Name</h1>
            <h3 className='text-3xl'>randomperson@email.com</h3>
            <h3>Adress : 124 Lane , ABC Colony</h3>
            <h2>Products Auctioned: X</h2>
            <h2>Products Sold: Y</h2>
            <button onClick={Logout} className='bg-amber-600 mt-7 rounded-lg p-2 px-4'> Logout </button>
        </div>
        <div className='w-[60%]'>

        <PaginationContainer productArray={AJK}/>
        </div>
        
      
    </div>
  )
}

export default ProfilePage
