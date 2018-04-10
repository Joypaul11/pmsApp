import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { SendService } from '../_services/send.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-amenity-add',
  templateUrl: './amenity-add.component.html',
  styleUrls: ['./amenity-add.component.css']
})
export class AmenityAddComponent implements OnInit {
  public amenityForm: FormGroup;
  public a_details: any;
  constructor(
    private _fb: FormBuilder,
    private sender: SendService,
    private auth: AuthenticationService
  ) { }

  ngOnInit() {
    this.a_details = this.auth.getUserDetails();
    this.amenityForm = this._fb.group({
      name: [null, Validators.required],
      description: [null, Validators.required],
      rate: [null, Validators.required],
      designation: [null, Validators.required],
      userid: [this.a_details._id]
    });
  }

  sendAmenityForm (form) {
    console.log(form.value);
    this.sender.sendAddAmenity(form.value)
    .subscribe (
      data => {},
      error => {}
    );
  }

  
}
