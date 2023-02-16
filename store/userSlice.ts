import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '../store/constant-data';
import { IUser, IUsers, IStatus } from '../types';

interface IState {
  users: IUsers,
  status: IStatus,
  error: unknown,
  isUserLoaded: boolean,
}

const initialState: IState = { 
  users: null,
  status: 'IDLE',
  error: null,
  isUserLoaded: false,
}
   
export const getUsers = createAsyncThunk<IUser[]>(
  'getUsers',
  async () => {
    try {
      const res = await fetch(BASE_URL)
      const json = await res.json()
      return json;
    } catch (error) {
      console.log(error)
    }
    
  }
)


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state, action) => {
      state.status = 'LOADING';
      state.error = null;
    })
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.status = 'SUCCEEDED';
      state.users = action.payload;
      state.error = null;
    })
    builder.addCase(getUsers.rejected, (state, action) => {
      state.status = 'ERROR';
      state.error = action.payload;
    })
  },
})

export const {  } = userSlice.actions;
export default userSlice.reducer;