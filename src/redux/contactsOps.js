import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkApi) => {
    try {
      const { data } = await axios.get(
        'https://66e0ad992fb67ac16f2a51c0.mockapi.io/contacts'
      );
      return data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.message); 
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactID, thunkApi) => {
    try {
      const { data } = await axios.delete(
        `https://66e0ad992fb67ac16f2a51c0.mockapi.io/contacts/${contactID}`
      );
      return data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (contactData, thunkApi) => {
    try {
      const { data } = await axios.post(
        `https://66e0ad992fb67ac16f2a51c0.mockapi.io/contacts`,
        contactData
      );
      return data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);