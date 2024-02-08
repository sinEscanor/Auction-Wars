import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postAuction,getAuctions,getAuction, deleteAuctions } from "./AuctionService";
import { getToken } from "../utils/authutils";
const initialState:{auctions: Array<any>,singleAuction:object, isLoading:boolean, isSingleAuctionLoading:boolean,isPostAuctionLoading:boolean,isPostAucSuccess: boolean,isPostAucErrMsg: any,isSuccess: boolean,isSingleAucSuccess: boolean, isError: boolean,isSingleAucError: boolean, message: any} = {
    auctions: [],
    singleAuction:{},
    isLoading: false,
    isSingleAuctionLoading: false,
    isPostAuctionLoading: false,
    isSuccess : false,
    isSingleAucSuccess: false,
    isPostAucSuccess: false,
    isPostAucErrMsg:'',
    isError: false,
    isSingleAucError:false,
    message: ''
}
export const  PostAuction:any = createAsyncThunk('post/auction', 
    async(auction: object, thunkApi:any ) =>{
        try{
            const token:string = getToken() ?? '' 
            return await postAuction(auction, token)
        } catch(error){
            const message = error;
            return thunkApi.rejectWithValue(message)
        }
    }
)
export const  GetAuctions:any = createAsyncThunk('get/auctions',
    async(_,thunkApi:any) =>{
        try{
            const token :string = getToken() ?? "" 
            const auction = await getAuctions(token)
            return auction
    } catch(error){
        const message = error;
        return thunkApi.rejectWithValue(message)
    }
    }
)
export const GetAuction:any = createAsyncThunk('get/auction',
    async(id:string, thunkApi:any)=>{
        try{
            // const token :string = thunkApi.getState().Authenticate.user.token
            const token = getToken() ?? ""
            return await getAuction(id,token)
        } catch(error){
            console.log(error)
            const message = error;
            return thunkApi.rejectWithValue(message)
        }
    }
)
export const DeleteAuction:any = createAsyncThunk('delete/auction',
    async(id: string, thunkApi:any) =>{
        try{
            const token:string = getToken() ?? ""
            return await deleteAuctions(id, token)
        }catch(error){
            const message = error;
            return thunkApi.rejectWithValue(message)
        }
    }
)

export const AuctionSlice = createSlice({
    name:'auction',
    initialState,
    reducers:{
        readjustLoading(state){
            state.isPostAucSuccess = false
            // state.isSingleAucError = !state.isSingleAucError 

        },
        readjustError(state){
            state.isSingleAucError = false 

        }

        
    },
    extraReducers :(builder) =>{
        builder
        .addCase(GetAuctions.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(GetAuctions.fulfilled, (state, action)=>{
            state.isLoading= false, 
            state.isSuccess = true,
            state.auctions = action.payload
        })
        .addCase(GetAuctions.rejected, (state, action)=>{
            state.isLoading = false,
            state.isError = true,
            state.message = action.payload
        
        })
        .addCase(GetAuction.pending, (state)=>{
            state.isSingleAuctionLoading = true
        })
        .addCase(GetAuction.fulfilled, (state, action)=>{
            state.isSingleAuctionLoading= false, 
            state.isSingleAucSuccess = true,
            state.singleAuction = {...action.payload}
        })
        .addCase(GetAuction.rejected, (state, action)=>{
            state.isSingleAuctionLoading = false,
            state.isSingleAucError = true,
            state.message = action.payload
        
        })
        .addCase(PostAuction.pending, (state)=>{
            state.isPostAuctionLoading = true
        })
        .addCase(PostAuction.fulfilled , (state, action)=>{
            state.isPostAuctionLoading = false,
            state.isPostAucSuccess = true,
            state.auctions.push(action.payload)
        })
        .addCase(PostAuction.rejected, (state,action)=>{ 
            state.isPostAuctionLoading = false,
            state.isSingleAucError = true,
            state.isPostAucErrMsg = action.payload
        })
        .addCase(DeleteAuction.pending, (state)=>{
            state.isSingleAuctionLoading = true
        })
        .addCase(DeleteAuction.fulfilled, (state, action)=>{
            state.isSingleAuctionLoading = false,
            state.isSingleAucSuccess = true,
            state.auctions = state.auctions.filter(auction =>{auction._id != action.payload._id})
        })
        .addCase(DeleteAuction.rejected,(state,action)=>{
            state.isSingleAuctionLoading = false,
            state.isSingleAucError = true,
            state.message = action.payload

        })
    }

})

export const AuctionActions= AuctionSlice.actions



