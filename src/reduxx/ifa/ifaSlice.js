import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const createNewIfa = createAsyncThunk(
    "ifa/createNewIfa",
    async (payload, { dispatch, rejectWithValue }) => {
        try {
            const res = await creteIfas();
            if (res) {
                // const data = { ...res.data, data: JSON.parse(decrypt(res.data.data)) };         
                return res;
            } else {
                throw new Error(res.data.message);
            }
        } catch (ifaError) {
            return rejectWithValue(ifaError.message);
        }
    }
);



const ifaSlice = createSlice({
    name: "ifa",
    initialState: {
        questions: []
    },
    reducers: {
        uploadDocs: (state, action) => {
            if (action.payload) {
                state.docs = [...state.docs, action.payload]
            }
        },
    },
    extraReducers: {
        // create IFA phase 2
        [createNewIfaPhase2.pending]: (state) => {
            state.loading = true;
        },
        [createNewIfaPhase2.fulfilled]: (state, action) => {
            state.loading = false;
            state.msg = action.payload.message
        },
        [createNewIfaPhase2.rejected]: (state, ifaError) => {
            state.loading = false;
            state.ifaError = ifaError.payload || ifaError.ifaError.message;
        },
    }
});
export const { clearIfsState, uploadDocs, removeDocs, selectedId, clearCityDetail } = ifaSlice.actions;

export default ifaSlice.reducer;
