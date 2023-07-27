import React from 'react'
import { useState,ChangeEvent } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// import { Select, MenuItem } from '@mui/material'
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
        duration:0


    })
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

  return (
    <div>
      <div className='w-full  flex justify-center my-3  '>
        <div className='w-[700px] bg-[#2a2e35] p-10 rounded-2xl'>
        <h1 className='text-2xl'>Enter the details of Auction</h1>
        <form onSubmit={submitHandler} className='[&>*]:rounded [&>*]:my-3 [&>*]:p-2 flex flex-col text-black'>
            <input className='' onChange={changeHandler} name='title' type="text"  placeholder='Enter the title' />
            <input className='' onChange={changeHandler} name='photo' type="text"  placeholder='Upload your image'/> 
            {/* <input className='my-3 p-2'  type="text" placeholder='Upload your photo' />  */}
            <input className='' onChange={changeHandler} name='description' type="text" placeholder='Enter the description of the project' />
            <input className='' onChange={changeHandler} name='startDate'  type="date"  />
            <input className='' onChange={changeHandler}  type="number" name='initialBid' placeholder='Enter the duration' /> 
                {/* <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={age}
            label="Age"
            // onChange={handleChange}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select> */}
            
            <button className='my-4 p-2 w-[30%] bg-amber-600 text-2xl text-white'  type='submit'>Post</button>         
        </form>
      </div>
    </div>
    </div>
  )
}

export default PostAuctionPage
