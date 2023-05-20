import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import {Outlet} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { UserActions } from '../store/UserSlice';
const Navbar = () => {
  const user = useSelector((state : any)=>state.Authenticate.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <>
    <nav className='flex justify-between items-center py-3'>
        <h1>Auction.in</h1>
        <ul className='flex items-center'>
            <li >Home</li>
            <li>Ongoing Auctions</li>
            <li>Post Auction</li>         
            <li className='ml-9'> { 
            user ?(  <button className='bg-blue-700 rounded-lg p-2 px-4'> {user.name}</button>):
              (<button onClick={()=> navigate('/login')} className='bg-blue-700 rounded-lg p-2 px-4 '> Login</button>)
            } </li>
            <li> <button onClick={()=> dispatch(UserActions.logout())} className='bg-blue-700 rounded-lg p-2 px-4'> Logout </button></li>
            

        </ul>
    </nav>
    <Outlet/>
    </>
  )
}

export default Navbar
