import axios from "axios";

export const postAuction = async(auction:any, token:string) =>{
    const formData:any = new FormData()
    formData.append('title', auction.title)
      formData.append('description', auction.description)
      formData.append('photo', auction.photo)
      formData.append('initialBid', auction.initialBid)
      formData.append('startDate', auction.startDate)
      formData.append('duration', auction.duration)
    const config = {
        headers:{
            'Authorization' : `Bearer ${token}`,
            'Content-Type': "application/x-www-form-urlencoded",

        }
    }
    const response = await axios.post("http://localhost:5000/api/auction", formData, config)
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
