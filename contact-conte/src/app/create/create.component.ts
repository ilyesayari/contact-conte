import { Component, Inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Contact } from '../models/contact.models';
import { AppState } from '../app.state';
import * as ContactActions from '../actions/contact.actions';
import { MatSnackBar } from '@angular/material/snack-bar';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  public form: FormGroup = this.fb.group({
    name: [null, Validators.required],
    surName: [null, Validators.required],
    email: [null, (Validators.required, Validators.email)],
  });

  public edit: boolean = false;

  getErrorMessage() {
    if (this.form.get('email').hasError('required')) {
      return 'You must enter a value';
    }
    return this.form.get('email').hasError('email') ? 'Not a valid email' : '';
  }

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private modal: MatDialog,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  addContact() {
    this.store.dispatch(
      new ContactActions.AddContact(this.form.value as Contact)
    );
    this.cloeModal();
    this._snackBar.open('Contact Added', 'Done', {
      duration: 2000,
    });
  }
  updateContact() {
    this.store.dispatch(
      new ContactActions.UpdateContact(
        this.form.value as Contact,
        this.data.index
      )
    );
    this.cloeModal();
    this._snackBar.open('Contact Updated', 'Done', {
      duration: 2000,
    });
  }

  cloeModal(): void {
    this.modal.closeAll();
  }

  ngOnInit(): void {
    if (this.data !== null && this.data !== undefined) {
      this.form.patchValue({
        name: this.data.item.name,
        surName: this.data.item.surName,
        email: this.data.item.email,
      });
      this.edit = true;
    }
  }
}
