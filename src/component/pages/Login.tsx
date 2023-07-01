import {ChangeEvent,useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { UserActions } from '../../store/UserSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const disptach = useDispatch()
    const navigate = useNavigate()
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
                    navigate('/')   
                    console.log(User)
                }catch(error){
                    console.log(error)
                }
                
            }
            postUser();       
        
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
