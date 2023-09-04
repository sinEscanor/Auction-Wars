import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { UserActions } from '../../store/UserSlice'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Alert } from '@mui/material'
import { GetAuctions } from '../../store/AuctionSlice'
const Register = () => {
    const disptach = useDispatch();
    const naviagate = useNavigate();
    const [isError, setIsError] = useState(false)
    const [err, setErr] = useState('')
    const [User, setUser] = useState({
        email : '',
        password: '',
        name: '',
        address:''
    })
    
    const emailChangeHandler = (e: any)=>{
        setUser((prevState)=>({
            ...prevState,
            email: e.target.value
        }))
    }
    const passwordChangeHandler =(e:any)=>{
        setUser((prevState)=>({
            ...prevState,
            password: e.target.value
        }))
    }
    const nameChangeHandler = (e: any)=>{
        setUser((prevState)=>({
            ...prevState,
            name: e.target.value
        }))

    }
    const addressChangeHandler = (e: any)=>{
        setUser((prevState)=>({
            ...prevState,
            address: e.target.value
        }))
    }
    const submitHandler = (e: any)=>{
        e.preventDefault()
        const addUser = async()=>{
            try{
            //     const response = await fetch("https://auction-wars-backend.vercel.app/api/auth/register",
            //     {
            //         method: 'POST',
            //         headers: {
            //             'Content-Type': 'application/json'
            //         },
            //         body: JSON.stringify(User)
            //     }
            // )
            const response = await axios.post("https://auction-wars-backend.vercel.app/api/auth/register", User)
            // const responseData = await response.json();
            console.log(response.data)

            localStorage.setItem('userInfo', JSON.stringify(response.data))  
            disptach(UserActions.login(response.data))
            disptach(GetAuctions())
            naviagate('/')
        
            } catch(error:any){
                setIsError(true);
                setErr(error.response.data.message)
                console.log(error);
            }
           
        }
        
        addUser();
    }
  return (    
    <div className='w-full h-screen flex flex-col justify-center items-center  '>
        <div className='w-[400px] bg-[#2a2e35] p-10 rounded-2xl'>
        <h1 className='text-2xl'>Login with you deatails</h1>
        {isError && <Alert className='my-2' variant="filled" severity="error">{err}</Alert>}
        <form onSubmit={submitHandler} className='flex flex-col text-black'>
            <input className='my-3 p-1' type="email"  onChange={emailChangeHandler} placeholder='Enter your email' />
            <input className='my-3 p-1' type="password" onChange={passwordChangeHandler} placeholder='Enter your password'/>   
            <input type="text" className='my-3 p-1' onChange={nameChangeHandler}  placeholder='Enter your name'/>
            <input type="text" className='my-3 p-1' onChange={addressChangeHandler}  placeholder='Enter your address'/>
            <button className='my-4 bg-amber-600 p-2' type='submit'>Signin</button>         
        </form>
        <p>Alredy registerd, <Link className='text-blue-500' to='/login'>login here</Link> </p> 
      </div>
    </div>
  )
}

export default Register
