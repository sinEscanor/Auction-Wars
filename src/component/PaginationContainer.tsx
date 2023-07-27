import React from 'react'
import ProfilePageProdCard from './ProfilePageProdCard'
import {useState} from 'react'
import { useRef } from 'react'

import {BsFillArrowLeftSquareFill,BsFillArrowRightSquareFill } from 'react-icons/bs'

import { useSelector } from 'react-redux';
interface Product{
  tile:string,
  price: number,
}

const PaginationContainer = ({productArray}: any) => {
  // const user:any = useSelector((state:any)=>{state.user.user});
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
        <div className='flex flex-col  gap-2'>
        {productArray.slice(ind,ind+3).map((product:any,index:any)=>{
          return <ProfilePageProdCard key={index} product={product}/>
        })}
          
        </div>
        
        <div className='flex my-2 items-center  text-lg'>        
        {/* <BiSolidLeftArrow className='p-4 bg-white text-black'/> */}
        <BsFillArrowLeftSquareFill onClick={prevPageFunction} className='text-3xl outline-none border-[0.5px]   cursor-pointer'/>
        <span>
          {PaginNationCountArray.map((item,index)=>{
            return <span onClick={()=>{setInd(3*index)}} key={index} className='px-2 cursor-pointer mx-1 border-[0.5px] border-white rounded-sm  text-white'>{index+1}</span>
          })}
        </span>  
        <BsFillArrowRightSquareFill onClick={nextPageFunction} className='text-3xl text-black bg-white outline-none bordrer-none cursor-pointer'/>
        {/* <BiSolidRightArrow className=''/> */}
        </div>      
    </div>
  )
}

export default PaginationContainer
