import { createSelector } from "@reduxjs/toolkit";

export const getContacts = (state) => state.phoneBook.items;
export const getFilter = (state) => state.phoneBook.filter;
export const getIsLoading = (state) => state.phoneBook.isLoading;

export const getVisibleContacts = createSelector(
  [getContacts, getFilter],
  (contacts, filter) => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  }
);

export const getContact = (contactID) => (state) =>
  state.phoneBook.items.find((item) => item.id === contactID);
