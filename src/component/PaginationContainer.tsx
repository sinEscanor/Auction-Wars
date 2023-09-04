
import ProfilePageProdCard from './ProfilePageProdCard'
import {useState} from 'react'

import {AiOutlineArrowLeft,AiOutlineArrowRight } from 'react-icons/ai'

// interface Product{
//   tile:string,
//   price: number,
// }

const PaginationContainer = ({productArray}: any) => {
  const [ind, setInd] = useState(0);
  const paginationCount = Math.ceil(productArray.length/3);
  const PaginNationCountArray = Array.from({length:paginationCount})

  const nextPageFunction = ()=>{
    if(ind<=Math.ceil(productArray.length/3)){

      setInd(ind+3);
    }
    return;
  }
  const prevPageFunction = ()=>{
    if(ind>0){
      setInd(ind-3);
    }
    return;
  }


  return (
    <div className='flex flex-col items-center' >
      {productArray.length === 0 ? <h1 className='text-3xl flex justify-center items-center p-8 bg-zinc-800 rounded '>No auctions to show</h1>:<>
        <div className='flex flex-col  gap-2'>
        {productArray.slice(ind,ind+3).map((product:any,index:any)=>{
          return <ProfilePageProdCard key={index} product={product}/>
        })}
          
        </div>
        
        <div className='flex my-2 items-center  text-lg'>       
        <AiOutlineArrowLeft onClick={prevPageFunction} className='text-2xl  outline-none    cursor-pointer'/>
        <span>
          {PaginNationCountArray.map((item,index)=>{
            console.log(item)
            return <span onClick={()=>{setInd(3*index)}} key={index} className='px-2 cursor-pointer mx-1 border-[0.5px] border-white rounded-sm  text-white'>{index+1}</span>
          })}
        </span>  
        <AiOutlineArrowRight onClick={nextPageFunction} className='text-2xl text-white outline-none bordrer-none cursor-pointer'/>
        </div>   
          </>} 
    </div>
  )
}

export default PaginationContainer
