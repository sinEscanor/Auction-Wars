import axios from "axios";

export const postAuction = async(auctionData:object, token:string) =>{
    const config = {
        headers:{
            Authorization : `Bearer ${token}`
        }
    }
    const response = await axios.post("http://localhost:5000/api/auction", auctionData, config)
    // console.log(response.data.auction)
    return response.data.auction

}

export const getAuctions = async(token:string)=>{
    const config= {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }
    const response =  await axios.get("http://localhost:5000/api/auction", config)
    return response.data.auction
}
export const getAuction = async(id:string, token:string)=>{
    const config= {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }
    // console.log(id)
    const response =  await axios.get(`http://localhost:5000/api/auction/${id}`, config)
    return response.data.auction
}
export const deleteAuctions = async(id:string, token:string)=>{
    const response = await fetch(
        `http://localhost:5000/api/auction/${id}`,
        {
            method:'DELETE',
            headers:{
                Authorization: `Bearer ${token}`
            }
        }
    )
    const resData = response.json()
    return resData
}
