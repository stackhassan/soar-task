import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  avatar: string;
  role: string;
  dateOfBirth: string;
  presentAddress: string;
  permanentAddress: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
  joinDate: string;
  lastLogin: string;
}

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  const response = await fetch('/src/data/userData.json');
  const data = await response.json();
  return data.user;
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.error = null;
    },
    updateUser: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch user data';
      });
  },
});

export const { updateUser, logout } = userSlice.actions;

export default userSlice.reducer;
