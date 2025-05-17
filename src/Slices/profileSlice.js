import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    loading: false,
    postedJobs:[],
    // Balance:0
};

const profileSlice = createSlice({
    name:"profile",
    initialState: initialState,
    reducers: {
        setUser(state, value) {
            state.user = value.payload;
        },
        setLoading(state, value) {
            state.loading = value.payload;
        },
        setPostedJobs(state,value){
            state.postedJobs=value.payload;
        },
        // setBalance(state,value){
        //     state.Balance=value.payload;
        // }
    },
});

export const {setUser, setLoading, setPostedJobs
    // , setBalance
} = profileSlice.actions;
export default profileSlice.reducer;