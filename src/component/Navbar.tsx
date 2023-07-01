import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import {Outlet} from 'react-router-dom'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { UserActions } from '../store/UserSlice';
const Navbar = () => {
  const user = useSelector((state : any)=>state.Authenticate.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = ()=>{
    localStorage.removeItem('userInfo')
    dispatch(UserActions.logout())
  }
  return (
    <>
    <nav className='flex justify-between items-center py-3'>
        <h1>Auction.in</h1>
        <ul className='flex items-center'>
          
            <li > <Link to='/'> Home</Link></li>
            <li><Link to='/'> Ongoing auctions</Link></li>
            <li><Link to='/auction/post'> Post Auctions</Link></li>         
            <li className='ml-9'> { 
            user ?(  <button className='bg-blue-700 rounded-lg p-2 px-4'> {user.user.name}</button>):
              (<button onClick={()=> navigate('/login')} className='bg-blue-700 rounded-lg p-2 px-4 '> Login</button>)
            } </li>
            <li> <button onClick={logoutHandler} className='bg-blue-700 rounded-lg p-2 px-4'> Logout </button></li>
            

        </ul>
    </nav>
    <Outlet/>
    </>
  )
}

export default Navbar
