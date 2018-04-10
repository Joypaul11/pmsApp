import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../_services/data.service';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { AuthenticationService, UserDetails } from '../authentication.service';
import * as moment from 'moment';
import { SendService } from '../_services/send.service';


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  myForm: FormGroup;
  details: UserDetails;
  constructor(
    private router: Router,
    private dataService: DataService,
    private _fb: FormBuilder,
    private auth: AuthenticationService,
    private sender: SendService
  ) { }

  ngOnInit() {
    console.log('Finally got room number' + this.dataService.roomNumber, this.dataService.roomName, this.dataService.rateType);
    this.getUserDetails();
  }

  getUserDetails() {
    this.auth.profile().subscribe(user => {
      this.details = user;
      this.myForm = this._fb.group({
        title: [null, Validators.required],
        firstname: [null, Validators.required],
        middlename: [null],
        email: [null],
        contact: [null],
        nationality: [null],
        lastname: [null, Validators.required],
        arrival: [this.dataService.startDate, Validators.required],
        departure: [this.dataService.endDate, Validators.required],
        adults: [null, Validators.required],
        children: [null],
        rate_type: [this.dataService.rateType],
        room_number: [this.dataService.roomNumber, Validators.required],
        room_type: [this.dataService.roomName, Validators.required],
        property: [this.dataService.property],
        bookDate: [moment().format('YYYY-MM-DD')],
        userid: [this.details._id],
        id: [moment().format('YYYY-MM-DD')]
      });
    }, (err) => {
      console.error(err);
    });
  }

  showRates () {
    this.router.navigate(['/room-rates']);
  }

  addBooking(form) {
    console.log(form.value);
    this.sender.addSingleBooking(form.value)
    .subscribe (
      data => {
        
      },
      error => {}
    );
  }
}
