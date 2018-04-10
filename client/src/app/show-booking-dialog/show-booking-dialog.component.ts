import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-show-booking-dialog',
  templateUrl: './show-booking-dialog.component.html',
  styleUrls: ['./show-booking-dialog.component.css']
})
export class ShowBookingDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) private data

  ) { }

  ngOnInit() {
    console.log(this.data.booking);
  }

}
