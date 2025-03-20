import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

const ELEMENT_DATA = [
  { role: 1, name: 'Hydrogen', email: 1.0079, status: 'H' },
  { role: 2, name: 'Helium', email: 4.0026, status: 'He' },
  { role: 3, name: 'Lithium', email: 6.941, status: 'Li' },
  { role: 4, name: 'Beryllium', email: 9.0122, status: 'Be' },
  { role: 5, name: 'Boron', email: 10.811, status: 'B' },
  { role: 6, name: 'Carbon', email: 12.0107, status: 'C' },
  { role: 7, name: 'Nitrogen', email: 14.0067, status: 'N' },
  { role: 8, name: 'Oxygen', email: 15.9994, status: 'O' },
  { role: 9, name: 'Fluorine', email: 18.9984, status: 'F' },
  { role: 10, name: 'Neon', email: 20.1797, status: 'Ne' },
];

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  constructor(private router: Router) {}
  addUser() {
    this.router.navigate(['users/add-user']);
  }
  ngOnInit(): void {}

  displayedColumns: string[] = [
    'name',
    'email',
    'phone',
    'role',
    'status',
    'action',
  ];
  dataSource = ELEMENT_DATA;
}
