import { HiOutlineTrash } from "react-icons/hi";

const ProfilePageProdCard = ({product}:any) => {
  console.log(product)
  return (
    <div className=' flex  gap-3 w-[40vw] bg-zinc-800 rounded-md '>
      <img src={product.photo} alt="auction" className='w-[50%] object-cover  rounded-md h-[25vh]' />
      <div className='flex justify-between w-full'> 
      <div >
      <h1 className='text-3xl text-yellow-500'>{product.title}</h1>
      <h3 className='text-2xl'>Base price: $ {product.initialBid}</h3>
      <p className='mt-4 text-lg'>Status: {product.staus}</p>
      {product.status == 'Sold' ? <p className=''>Buyer: {product.winner}</p>: <h1></h1>}
      </div>
      
      <HiOutlineTrash className='text-2xl m-3 cursor-pointer '/>
      </div>
      
      
         
    </div>
  )
}

export default ProfilePageProdCard
