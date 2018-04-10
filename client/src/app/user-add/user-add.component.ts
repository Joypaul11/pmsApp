import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { SendService } from '../_services/send.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {
  public userForm: FormGroup;
  public a_details: any;
  public type = 'password';
  constructor(
    private _fb: FormBuilder,
    private sender: SendService,
    private auth: AuthenticationService
  ) { }

  ngOnInit() {
    this.a_details = this.auth.getUserDetails();
    this.userForm = this._fb.group({
      name: [null, Validators.required],
      email: [null, Validators.required],
      location: ['dummy', Validators.required],
      property: [this.a_details.properties[0]],
      password: [null, Validators.required],
      designation: [null, Validators.required],
      a_userid: [this.a_details._id]
    });
  }

  sendUserForm (form) {
    console.log(form.value);
    this.sender.sendAddUser(form.value)
    .subscribe (
      data => {},
      error => {}
    );
  }

  toggleShow () {
    if (this.type === 'password') {
      this.type = 'text';
    }
    if (this.type === 'text') {
      this.type = 'password';
    }
  }

}
