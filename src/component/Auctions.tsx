import React from 'react'
import ProductCard from './ProductCard'
import { useSelector } from 'react-redux'


const Auctions = () => {
  const auction:any = useSelector((state:any)=> state.Auction.auctions)


  

  const CurrentAuctions:any = auction.filter((auction:any)=>  auction.staus != 'Ended' )

  return (
    <div className='flex gap-6 justify-center m-5 flex-wrap'>
      {CurrentAuctions.map((product: any,index:number)=>{
        // const {_id, title, description, photo, date, initialBid, duration, status, highestBid} = product
        return(
          <ProductCard key={index}  {...product }/>
        )
      })}
      {/* <ProductCard/>
      <ProductCard/>
      <ProductCard/>
      <ProductCard/>
      <ProductCard/>
  
      <ProductCard/> */}
    </div>
  )
}

export default Auctions
