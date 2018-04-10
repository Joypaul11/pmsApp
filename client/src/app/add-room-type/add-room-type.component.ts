import { Component, OnInit } from '@angular/core';
import { SendService } from '../_services/send.service';
import { AuthenticationService } from '../authentication.service';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-room-type',
  templateUrl: './add-room-type.component.html',
  styleUrls: ['./add-room-type.component.css']
})
export class AddRoomTypeComponent implements OnInit {
  public dummForm: FormGroup;
  public details: any;
  public roomForm: FormGroup;
  public properties: any;
  public allRooms: any;
  public amenities: any;
  constructor(
    private sender: SendService,
    private auth: AuthenticationService,
    private _fb: FormBuilder
  ) { }

  ngOnInit() {
    this.getUserDetails();
    this.makeForm();
    
    this.sender.getAllAmenity()
    .subscribe(
      data => {
        this.amenities = data;
      },
      error => {}
    );

  }

  getUserDetails () {
    this.getAllRooms();
    this.auth.profile()
    .subscribe (
      data => {
        this.properties = data.properties;

        this.details = data;

        

      },
      error => {}
    );
  }

  makeForm () {
    this.roomForm = this._fb.group({
      room_name: [null, Validators.required],
      no_of_rooms: [null, Validators.required],
    base_price: [null, Validators.required],
    ex_person_charge: [null, Validators.required],
    ex_bed_charge: [null, Validators.required],
    occup_base: [null, Validators.required],
    occup_max: [null, Validators.required],
    occup_ex_beds: [null, Validators.required],
    userid: [this.details._id],
    property: [this.properties[0]],
    room_numbers: [null],
    rates: this._fb.array([ this.createRate(this.details.rates[0]) ])
    });

    for (var i=1; i<this.details.rates.length; i++) {
      this.addRate(i,this.details.rates[i]);
    }
  }
  
    createRate(rate: string) {
      return this._fb.group({
        rate_type: [ rate, Validators.required],
        rate_value: [null, Validators.required],
        vat_rate: [null]
      });
    }


  addRate(i: number, rate: string) {
    const items = this.roomForm.get(`rates`) as FormArray;
    console.log(i, items);

    items.push(this.createRate(rate));
  }

  
  getAllRooms () {
    this.sender.getAllRooms()
    .subscribe(
      data => {
        
          
          console.log(JSON.stringify(this.allRooms));
        
      },
      error => {}
    );
  }

  addRoomSubmit (form: any) {
    console.log(form.value);
    console.log(this.allRooms);
    let hun = 0;
    if (this.allRooms.length ==! 0){
    if (this.allRooms.length > 0){
      hun = ((this.allRooms[this.allRooms.length - 1].room_numbers[0] / 100) + 1) * 100;
    }}
     else {
      hun = 100;
    }
    form.value.room_numbers = [];
    for (var i=0; i<form.value.room_count; i++) {
      form.value.room_numbers.push(i+hun);
    }
    this.sender.addRooms(form.value)
    .subscribe(
      data => {
        this.ngOnInit();

        hun += 100;
      },
      error => {}
    );
  }
}
