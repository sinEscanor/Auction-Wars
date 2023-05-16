import React from 'react'
import Button from '@mui/material/Button';

const Navbar = () => {
  return (
    <nav className='flex justify-between items-center py-3'>
        <h1>Auction.in</h1>
        <ul className='flex items-center'>
            <li >Home</li>
            <li>Ongoing Auctions</li>
            <li>Post Auction</li>
            <li className='ml-9'> <button className='bg-blue-700 rounded-lg p-2 px-4'> Profile</button></li>
        </ul>
    </nav>
  )
}

export default Navbar
