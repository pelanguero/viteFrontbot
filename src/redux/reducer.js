import { createSlice } from '@reduxjs/toolkit'



export const slice = createSlice({
  name: 'autorize',
  initialState: {
    token: localStorage.getItem('Session'),
  },
  reducers: {
    setTok: (state, action) => {
        state.token = action.payload
    },
  },
});

export const {setTok} = slice.actions;
export const selectToken = state => state.autorize.token;
export default slice.reducer;