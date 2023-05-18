import React from 'react'
import {ChangeEvent,useState} from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
    const [User, setUser] = useState({
        email: '',
        password: ''
    })

    const submitHandler = (e: any) =>{
        e.preventDefault();
        
    }
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
    

  return (
    <div className='w-full h-screen flex justify-center items-center  '>
        <div className='w-[400px] bg-[#2a2e35] p-10 rounded-2xl'>
        <h1 className='text-2xl'>Login with you deatails</h1>
        <form onSubmit={submitHandler} className='flex flex-col text-black'>
            <input className='my-3 ' type="email"  onChange={emailChangeHandler} placeholder='Enter your email' />
            <input className='my-3' type="password" onChange={passwordChangeHandler} placeholder='Enter your password'/>   
            <button className='m-4 bg-amber-600' type='submit'>Login</button>         
        </form>
      <p>New to the website , <Link to='/register'> regiter here</Link></p>
      </div>
    </div>
  )
}

export default Login
