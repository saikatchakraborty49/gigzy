import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signupData:null,
  loading:false,
  token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
  contactNumber:null,
  updateProfile:null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setSignupData(state, value) {
      state.signupData = value.payload;
    },
    setToken(state, value) {
      state.token = value.payload;
    },
    setLoading(state, value) {
      state.loading = value.payload;
    },
    setContactNumber(state,value){
      state.contactNumber=value.payload;
    },
    setUpdateProfile(state,value){
      state.updateProfile=value.payload;
    }
  },
});

export const {setToken,setLoading,setSignupData,setContactNumber,setUpdateProfile } = authSlice.actions;

export default authSlice.reducer;
