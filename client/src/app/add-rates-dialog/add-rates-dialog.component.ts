import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-rates-dialog',
  templateUrl: './add-rates-dialog.component.html',
  styleUrls: ['./add-rates-dialog.component.css']
})
export class AddRatesDialogComponent implements OnInit {

  public rateForm: FormGroup; // form group instance
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    
  }


}
