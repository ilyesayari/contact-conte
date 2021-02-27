import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Contact } from '../models/contact.models';
import { AppState } from '../app.state';
import * as ContactActions from '../actions/contact.actions';

import { CreateComponent } from '../create/create.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss'],
})
export class ReadComponent implements OnInit {
  dataSource: Observable<Contact[]>;
  constructor(private store: Store<AppState>, public dialog: MatDialog) {
    this.dataSource = store.select('contact');
  }
  displayedColumns: string[] = ['name', 'surName', 'email', 'actions'];
  openModal(): void {
    const dialogRef = this.dialog.open(CreateComponent);
  }

  deleteItem(index: number): void {
    this.store.dispatch(new ContactActions.RemoveContact(index));
  }

  updateItem(item: Contact, index: number): void {
    const dialogRef = this.dialog.open(CreateComponent, {
      data: { item, index },
    });
  }

  ngOnInit(): void {}
}
