
import { useSelector } from 'react-redux';
import {Outlet} from 'react-router-dom'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
  const user = useSelector((state : any)=>state.Authenticate.user)
  
  const navigate = useNavigate();

  return (
    <>
    <nav className='flex justify-between items-center py-3'>
        <h1 className='text-lg'>Auctionwars</h1>
        <ul className='flex items-center'>
          
            <li className='hover:text-amber-500' > <Link to='/'> Home</Link></li>
            <li className='hover:text-amber-500'><Link to='/auction/post'> Post Auctions</Link></li>         
            <li className='ml-9'> { 
            user ?(  <button onClick={()=>navigate('/userinfo')} className='bg-gradient-to-r from-[#EC9F05] to-[#FF4E00]  rounded-lg p-2 px-4'> {user.user.name}</button>):
              (<button onClick={()=> navigate('/login')} className='bg-gradient-to-r from-[#20BF55] to-[#01BAEF] bg-clip-text bg-transparent rounded-lg p-2 px-4 '> Login</button>)
            } </li>
            
            

        </ul>
    </nav>
    <Outlet/>
    </>
  )
}

export default Navbar
