import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postAuction,getAuctions,getAuction, deleteAuctions } from "./AuctionService";
const initialState:{auctions: Array<any>,singleAuction:object, isLoading:boolean, isSuccess: boolean, isError: boolean, message: any} = {
    auctions: [],
    singleAuction:{},
    isLoading: false,
    isSuccess : false,
    isError: false,
    message: ''
}
export const  PostAuction:any = createAsyncThunk('post/auction', 
    async(auction: object, thunkApi:any ) =>{
        try{
            const token:string = thunkApi.getState().Authenticate.user.token
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
            const token :string = thunkApi.getState().Authenticate.user.token
            return await getAuctions(token)
    } catch(error){
        const message = error;
        return thunkApi.rejectWithValue(message)
    }
    }
)
export const GetAuction:any = createAsyncThunk('get/auction',
    async(id:string, thunkApi:any)=>{
        // console.log(id)
        try{
            const token :string = thunkApi.getState().Authenticate.user.token
            return await getAuction(id,token)
        } catch(error){
            const message = error;
            return thunkApi.rejectWithValue(message)
        }
    }
)
export const DeleteAuction:any = createAsyncThunk('delete/auction',
    async(id: string, thunkApi:any) =>{
        try{
            const token:string = thunkApi.getState().Authnticate.user.token
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
            state.isLoading = true
        })
        .addCase(GetAuction.fulfilled, (state, action)=>{
            state.isLoading= false, 
            state.isSuccess = true,
            state.singleAuction = {...action.payload}
        })
        .addCase(GetAuction.rejected, (state, action)=>{
            state.isLoading = false,
            state.isError = true,
            state.message = action.payload
        
        })
        .addCase(PostAuction.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(PostAuction.fulfilled , (state, action)=>{
            state.isLoading = false,
            state.isSuccess = true,
            state.auctions.push(action.payload)
        })
        .addCase(PostAuction.rejected, (state,action)=>{ 
            state.isLoading = false,
            state.isError = true,
            state.message = action.payload
        })
        .addCase(DeleteAuction.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(DeleteAuction.fulfilled, (state, action)=>{
            state.isLoading = false,
            state.isSuccess = true,
            state.auctions = state.auctions.filter(auction =>{auction._id != action.payload._id})
        })
        .addCase(DeleteAuction.rejected,(state,action)=>{
            state.isLoading = false,
            state.isError = true,
            state.message = action.payload

        })
    }

})