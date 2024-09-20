import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const instance = axios.create({
  baseURL: 'https://connections-api.goit.global',
});

export const setHeaders = token => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const register = createAsyncThunk(
  'auth/register',
  async (userData, thunkApi) => {
    try {
      const { data } = instance.post('/users/signup', userData);
      setHeaders(data.token);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (userData, thunkApi) => {
    try {
      const response = await instance.post('/users/login', userData);
      setHeaders(response.data.token);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const token = state.auth.token;
      setHeaders(token);
      const { data } = await instance.get('/users/current');
      console.log(state);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
  {
    condition: (_, thunkApi) => {
      const state = thunkApi.getState();
      const token = state.auth.token;
      if (token) {
        return true;
      }
      return false;
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, thunkApi) => {
  try {
    await instance.post('/users/logout');
    return
  } catch (error) {
    return thunkApi.rejectWithValue(error.message)
  }
});