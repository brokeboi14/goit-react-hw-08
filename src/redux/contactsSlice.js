import { createSelector, createSlice } from "@reduxjs/toolkit";
import { fetchContacts, deleteContact, addContact } from "./contactsOps";
import { selectNameFilter } from "./filtersSlice";

const INITIAL_STATE = {
    items: [],
    isLoading: false,
    error: null,
}

const contactsSlice = createSlice({
    name: 'contacts',
    initialState: INITIAL_STATE,
    reducers: {},

    extraReducers: builder => {
        return builder
          .addCase(fetchContacts.pending, state => {
            state.isLoading = true;
            state.error = null;
          })
          .addCase(fetchContacts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.items = action.payload;
          })
          .addCase(fetchContacts.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
          })
    
          .addCase(deleteContact.pending, state => {
            state.isLoading = true;
            state.error = null;
          })
          .addCase(deleteContact.fulfilled, (state, action) => {
            state.isLoading = false;
            state.items = state.items.filter(
              contact => contact.id !== action.payload.id
            );
          })
          .addCase(deleteContact.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
          })
    
          .addCase(addContact.pending, state => {
            state.isLoading = true;
            state.error = null;
          })
          .addCase(addContact.fulfilled, (state, action) => {
            state.isLoading = false;
            state.items.unshift(action.payload);
          })
          .addCase(addContact.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
          });
      },
})

export const contactsReducer = contactsSlice.reducer;

export const selectContacts = state => {
  return state.contacts.items;
};

export const selectLoader = state => {
  return state.contacts.isLoading;
};

export const selectError = state => {
  return state.contacts.error;
};

export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contacts, filtredValue) => {
    return contacts.filter(contact => {
      return contact.name.toLowerCase().includes(filtredValue.toLowerCase());
    });
  }
);