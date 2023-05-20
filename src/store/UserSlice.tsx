import { createSlice } from "@reduxjs/toolkit";
const user1 = localStorage.getItem("userInfo");
const userObj = user1? JSON.parse(user1): null;

const initialState = {user:userObj ? userObj :null}

const UserSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        login(state, action){
            state.user = action.payload;
        },
        logout(state){
            state.user= null
        }
    }
})
export default UserSlice
export const UserActions = UserSlice.actions