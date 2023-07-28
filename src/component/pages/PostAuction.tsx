import React from 'react'
import { useState,ChangeEvent } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Select, MenuItem, InputLabel, FormControl } from '@mui/material'
import { PostAuction, GetAuctions } from '../../store/AuctionSlice'




const PostAuctionPage = () => {
  // const token = useSelector((state : any) => state.Authenticate.user.token)
  const dispatch = useDispatch()

  // console.log(token)
    const navigate = useNavigate()
    // const [title, setTitle] = useState('')
    // const [image, setImage] = useState('')
    // const [miniumBid, setMinimumBid] = useState('')
    // const [satartDate, setStartDate] =useState('')
    
    const [auction, setAuction] = useState({
        title:'',
        description:'',
        photo:'',
        initialBid:'',
        
        startDate: new Date(),
        duration:5*60


    })
    const [duration, setDuration] = useState(5)
    const changeHandler = (e: ChangeEvent<HTMLInputElement>)=>{
        setAuction((prevState)=>({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const submitHandler = (e: any)=>{
      e.preventDefault();
      //  const postData = async() =>{

      //    const response = await fetch(
      //     `http://localhost:5000/api/auction/`,
      //     {
      //       method: 'POST',
      //       body: JSON.stringify(
      //         auction
      //       ),
      //       headers: {
      //         'Content-Type': 'application/json',
      //         'Authorization': `Bearer ${token}`
      //       }
      //     }

      //    )
      //    const resdata = await response.json()
      //    console.log(resdata)
      //  }
       
      //  postData()
        // console.log(auction)
        dispatch(PostAuction(auction))
        navigate('/')
    }

    const durationSelectHandler = (e:any)=>{

      setDuration(e.target.value)
      setAuction((prevState)=>({
        ...prevState,
        duration: e.target.value*60
        
      }))
      console.log(auction.duration)
      console.log(duration)
    }

  return (
    <div>
 
      <div className='w-full  flex justify-center my-3  '>
        <div className='w-[700px] bg-zinc-800 p-10 rounded-2xl'>
        <h1 className='text-2xl'>Enter the details of Auction</h1>
        <form onSubmit={submitHandler} className='[&>*]:rounded [&>*]:my-3 [&>*]:p-2 flex flex-col text-black'>
          
            <input className='' onChange={changeHandler} name='title' type="text"  placeholder='Enter the title' />

            <input className='' onChange={changeHandler} name='photo' type="text"  placeholder='Upload your image'/> 
            {/* <input className='my-3 p-2'  type="text" placeholder='Upload your photo' />  */}
            <input className='' onChange={changeHandler} name='description' type="text" placeholder='Enter the description of the project' />

            <input className='' onChange={changeHandler} name='startDate'  type="date"  />
          
            <Select
                size='small'
                name='duration'
                labelId="demo-simple-select-label"
                className='bg-white  text-black text-2xl'
                id="demo-simple-select"
                
                value={duration}
                // label="Select the duration"
                onChange={durationSelectHandler}
              >
      
                <MenuItem value={5}>5 minutes</MenuItem>
                <MenuItem value={10}>10 minutes</MenuItem>
                <MenuItem value={30}>30 minutes</MenuItem>
                <MenuItem value={60}> 1 Hour</MenuItem>
                <MenuItem value={120}>2 Hour</MenuItem>
          </Select>
                     
            <button className='my-4 p-2 w-[30%] bg-amber-600 text-2xl text-white'  type='submit'>Post</button>         
        </form>
      </div>
    </div>
    
    </div>
  )
}

export default PostAuctionPage
