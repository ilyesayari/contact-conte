import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Contact } from '../models/contact.models';
import {
  ADD_CONTACT,
  REMOVE_CONTACT,
  UPDATE_CONTACT,
} from '../utils/constants';

export class AddContact implements Action {
  readonly type = ADD_CONTACT;
  constructor(public payload: Contact) {}
}

export class RemoveContact implements Action {
  readonly type = REMOVE_CONTACT;
  constructor(public payload: number) {}
}

export class UpdateContact implements Action {
  readonly type = UPDATE_CONTACT;
  constructor(public payload: Contact, public index: number) {}
}

export type Actions = AddContact | RemoveContact | UpdateContact;
