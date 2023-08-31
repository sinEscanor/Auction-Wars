import {ChangeEvent,useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { UserActions } from '../../store/UserSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { GetAuctions } from '../../store/AuctionSlice'
import { Alert } from '@mui/material'

const Login = () => {
    const disptach = useDispatch()
    const navigate = useNavigate()
    const [isError, setIsError] = useState(false)
    const [err, setErr] = useState('')
    const [User, setUser] = useState({
        email: '',
        password: ''
    })

    
    const emailChangeHandler = (e: ChangeEvent<HTMLInputElement>)=>{
        setUser((prevState)=>({
            ...prevState, 
            email: e.target.value, 
            
        }))
    }
    const passwordChangeHandler = (e: ChangeEvent<HTMLInputElement>)=>{
        setUser((prevState)=>({
            ...prevState,
            password: e.target.value,
        }))
    }
    const submitHandler = (e: any) =>{
        e.preventDefault();

            const postUser = async()=>{
                try{
                    // const response = await fetch(
                    //     "http://localhost:5000/api/auth/login",
                    //     {
                    //         method: 'POST',
                    //         headers: {
                    //             'Content-Type': 'application/json'
                    //         },
                    //         body: JSON.stringify(User)
                    //     }
                    // )
                    const response = await axios.post("http://localhost:5000/api/auth/login",User)
                    
                    
                    // if (!response) {
                    //     throw new Error('Error:', response);
                    //   }
                    // const responseData = await response.json();
                    console.log(response.data)
                    disptach(UserActions.login(response.data)) 
                    localStorage.setItem('userInfo', JSON.stringify(response.data))  
                    disptach(GetAuctions())
                    navigate('/')   
                    console.log(User)
                }catch(error:any){
                    setIsError(true)
                    setErr(error.response.data.message)
                    console.log(error)
                }
                
            }
            postUser();       
        
    }

  return (
    <div className='w-full h-screen flex  justify-center items-center  '>
        <div className='w-[400px] bg-[#2a2e35] p-10 rounded-2xl'>
        <h1 className='text-2xl'>Login with you deatails</h1>
        {isError && <Alert className='my-2' variant="filled" severity="error">{err}</Alert>}
        <form onSubmit={submitHandler} className='flex flex-col text-black'>
            <input className='my-3 p-1' type="email"  onChange={emailChangeHandler} placeholder='Enter your email' />
            <input className='my-3 p-1' type="password" onChange={passwordChangeHandler} placeholder='Enter your password'/>  
            <button className='my-4 p-2 bg-amber-600' type='submit'>Login</button>         
        </form>
      <p>New to the website , <Link className='text-blue-500' to='/register'> regiter here</Link></p>
      </div>
    </div>
  )
}

export default Login
