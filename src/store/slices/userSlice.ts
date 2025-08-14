import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { api } from '../../lib/api';
import { logout } from './authSlice';

interface User {
  id: string;
  email: string;
  name: string | null;
}

interface UserState {
  profile: User | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UserState = {
  profile: null,
  status: 'idle',
  error: null,
};

// Async Thunks
export const fetchUserProfile = createAsyncThunk('user/fetchProfile', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/users/me');
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch profile');
  }
});

export const updateUserProfile = createAsyncThunk('user/updateProfile', async (data: any, { rejectWithValue }) => {
  try {
    const response = await api.put('/users/me', data);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Failed to update profile');
  }
});

export const deleteUserAccount = createAsyncThunk('user/deleteAccount', async (_, { dispatch, rejectWithValue }) => {
  try {
    await api.delete('/users/me');
    dispatch(logout());
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Failed to delete account');
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearProfile(state) {
      state.profile = null;
      state.status = 'idle';
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Logout clears profile
      .addCase(logout, (state) => {
        state.profile = null;
      })
      // Fetch profile
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserProfile.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = 'succeeded';
        state.profile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      // Update profile
      .addCase(updateUserProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserProfile.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = 'succeeded';
        state.profile = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      // Delete account
      .addCase(deleteUserAccount.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteUserAccount.fulfilled, (state) => {
        state.status = 'succeeded';
        state.profile = null;
      })
      .addCase(deleteUserAccount.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { clearProfile } = userSlice.actions;
export default userSlice.reducer;
