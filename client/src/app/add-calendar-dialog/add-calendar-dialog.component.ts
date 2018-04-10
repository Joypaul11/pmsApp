import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { DataService } from '../_services/data.service';

@Component({
  selector: 'app-add-calendar-dialog',
  templateUrl: './add-calendar-dialog.component.html',
  styleUrls: ['./add-calendar-dialog.component.css']
})
export class AddCalendarDialogComponent implements OnInit {
  public myForm: FormGroup;

  public inputSel = null;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data,
    private _fb: FormBuilder,
    private router: Router,
    private dataService: DataService
  ) { }

  ngOnInit() {
    console.log(this.data.startDate, this.data.roomNumber);
    this.dataService.roomNumber = this.data.roomNumber;
    this.myForm = this._fb.group({
      title: [null, Validators.required],
      firstname: [null, Validators.required],
      middlename: [null],
      lastname: [null, Validators.required],
      arrival: [this.data.startDate, Validators.required],
      nights: [null, Validators.required],
      departure: [this.data.endDate, Validators.required],
      adults: [null, Validators.required],
      children: [null],
      number_of_rooms: [1, Validators.required],
      company: [null],
      agent: [null],
      rate_type: [null]
    });
  }

  changeView () {
    if (this.inputSel === 'book') {
      this.router.navigate(['/book']);
    }
  }

}
