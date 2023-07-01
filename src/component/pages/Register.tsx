import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { UserActions } from '../../store/UserSlice'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const Register = () => {
    const disptach = useDispatch();
    const naviagate = useNavigate();
    const [User, setUser] = useState({
        email : '',
        password: '',
        name: ''
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
    const submitHandler = (e: any)=>{
        e.preventDefault()
        const addUser = async()=>{
            try{
            //     const response = await fetch("http://localhost:5000/api/auth/register",
            //     {
            //         method: 'POST',
            //         headers: {
            //             'Content-Type': 'application/json'
            //         },
            //         body: JSON.stringify(User)
            //     }
            // )
            const response = await axios.post("http://localhost:5000/api/auth/register", User)
            // const responseData = await response.json();
            console.log(response.data)

            localStorage.setItem('userInfo', JSON.stringify(response.data))  
            disptach(UserActions.login(response.data))
            naviagate('/')
            console.log(User)
            } catch(error){
                console.log(error);
            }
           
        }
        
        addUser();
    }
  return (    
    <div className='w-full h-screen flex justify-center items-center  '>
        <div className='w-[400px] bg-[#2a2e35] p-10 rounded-2xl'>
        <h1 className='text-2xl'>Login with you deatails</h1>
        <form onSubmit={submitHandler} className='flex flex-col text-black'>
            <input className='my-3 ' type="email"  onChange={emailChangeHandler} placeholder='Enter your email' />
            <input className='my-3' type="password" onChange={passwordChangeHandler} placeholder='Enter your password'/>   
            <input type="text" className='my-3' onChange={nameChangeHandler}  placeholder='Enter your name'/>
            <button className='m-4 bg-amber-600' type='submit'>Signin</button>         
        </form>
        <p>Alredy registerd, <Link to='/login'>login here</Link> </p> 
      </div>
    </div>
  )
}

export default Register
