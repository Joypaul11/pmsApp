import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { SendService } from '../_services/send.service';
import { AuthenticationService } from '../authentication.service';
@Component({
  selector: 'app-add-single-room',
  templateUrl: './add-single-room.component.html',
  styleUrls: ['./add-single-room.component.css']
})
export class AddSingleRoomComponent implements OnInit {
  public roomForm: FormGroup;
  public roomTypes: any;
  public details: any;
  constructor(
    private _fb: FormBuilder,
    private sender: SendService,
    private auth: AuthenticationService
  ) { }

  ngOnInit () {
    this.sender.getAllRooms()
    .subscribe(
      data => {
          this.roomTypes = data;
          

        
      },
      error => {}
    );

    this.details = this.auth.getUserDetails();
    
    this.roomForm = this._fb.group({
      room_number: [null, Validators.required],
      room_type: [null, Validators.required]
    });
  }

  addRoomSubmit (form) {
    let check = false;
    form.value.user_id = this.details._id;
    console.log(form.value);
    for (let room of this.roomTypes) {
      if (form.value.room_type === room.room_name) {
        for(let r of room.room_numbers) {
          if (r.toString() === form.value.room_number) {
            console.log('Room with this number already exists');
            check = true;
          } else {
            //send form
            
          }
        }
       }
    }
    if( check === false) {
    this.sender.addSingleRoom(form.value)
            .subscribe(
              data => {

              },
              error => {}
            );
  }
}


}
