import {ChangeEvent,useState} from 'react'
import { Link } from 'react-router-dom'
import { UserActions } from '../../store/UserSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const disptach = useDispatch()
    const navigate = useNavigate()
    const [User, setUser] = useState({
        email: '',
        password: '',
        name: ''
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
    const nameChangeHandler = (e: any)=>{
        setUser((prevState)=>({
            ...prevState,
            name: e.target.value
        }))
    }
    const submitHandler = (e: any) =>{
        e.preventDefault();
        disptach(UserActions.login(User)) 
        localStorage.setItem('userInfo', JSON.stringify(User))  
        navigate('/')   
        console.log(User)
    }

  return (
    <div className='w-full h-screen flex justify-center items-center  '>
        <div className='w-[400px] bg-[#2a2e35] p-10 rounded-2xl'>
        <h1 className='text-2xl'>Login with you deatails</h1>
        <form onSubmit={submitHandler} className='flex flex-col text-black'>
            <input className='my-3 ' type="email"  onChange={emailChangeHandler} placeholder='Enter your email' />
            <input className='my-3' type="password" onChange={passwordChangeHandler} placeholder='Enter your password'/> 
            <input type="text" className='my-3' onChange={nameChangeHandler}  placeholder='Enter your name'/>  
            <button className='m-4 bg-amber-600' type='submit'>Login</button>         
        </form>
      <p>New to the website , <Link to='/register'> regiter here</Link></p>
      </div>
    </div>
  )
}

export default Login
