import { Action } from '@ngrx/store';
import { Contact } from '../models/contact.models';
import * as ContactActions from '../actions/contact.actions';
import {
  ADD_CONTACT,
  REMOVE_CONTACT,
  UPDATE_CONTACT,
} from '../utils/constants';

const initialState: Contact = {
  name: 'Mohamed Elyes',
  surName: 'Ayari',
  email: 'medilyesayari@gmail.com',
};

export function reducer(
  state: Contact[] = [initialState],
  action: ContactActions.Actions
) {
  switch (action.type) {
    case ADD_CONTACT:
      return [...state, action.payload];
    case REMOVE_CONTACT:
      return [
        ...state.slice(0, action.payload),
        ...state.slice(action.payload + 1),
      ];
    case UPDATE_CONTACT:
      return [
        ...state.slice(0, action.index),
        ...state.slice(action.index + 1),
        action.payload,
      ];
    default:
      return state;
  }
}
