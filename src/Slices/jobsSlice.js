import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    proposals: null,
};

const jobsSlice = createSlice({
    name:"jobs",
    initialState: initialState,
    reducers: {
        setProposals(state, value) {
            state.proposals = value.payload;
        }
    },
});

export const {setProposals} = jobsSlice.actions;
export default jobsSlice.reducer;