import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
const Register = () => {
    const [User, setUser] = useState({
        email : '',
        password: '',
        name: ''
    })
    const submitHandler = (e: any)=>{
        e.preventDefault()
    }
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
  return (    
    <div>
        <h1>Login with you deatails</h1>
        <form onSubmit={submitHandler}>
            <input type="email"  onChange={emailChangeHandler} placeholder='Enter your email' />
            <input type="text" onChange={nameChangeHandler} placeholder='Enter your name'/>
            <input type="password" onChange={passwordChangeHandler} placeholder='Enter your password'/>   
            <button type='submit'>Login</button>         
        </form>
      <p>Alredy registerd, <Link to='/login'>login here</Link> </p>
    </div>
  )
}

export default Register
