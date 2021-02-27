import { Contact } from './models/contact.models';

export interface AppState {
  readonly contact: Contact[];
}
