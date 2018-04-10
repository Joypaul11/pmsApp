import { Component, OnInit } from '@angular/core';
import { ComponentPortal } from '@angular/cdk/portal';
import { CardtemplateComponent } from '../cardtemplate/cardtemplate.component';
import { PortalModule } from '@angular/cdk/portal';
import { Router } from '@angular/router';
import { SendService } from '../_services/send.service';
import { AuthenticationService, UserDetails } from '../authentication.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { AddRatesDialogComponent } from '../add-rates-dialog/add-rates-dialog.component';

import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';



@Component({
  selector: 'app-add-rooms',
  templateUrl: './add-rooms.component.html',
  styleUrls: ['./add-rooms.component.css']
})
export class AddRoomsComponent implements OnInit {

  RatesDialogRef: MatDialogRef<AddRatesDialogComponent>;

  public myForm: FormGroup;
  public basicInfo = true;

  index = 0;
  public divCount = [];

  name: string[] = [];
  base_price: number[] = [];
  ex_person_charge: number[] = [];
  ex_bed_charge: number[] = [];
  no_of_rooms: number[] = [];
  occup_base: number[] = [];
  occup_max: number[] = [];
  occup_ex_beds: number[] = [];
  room_number: number[][];
  rate_type: string[] = [];
  rate_val: number[] = [];

  newRoom: RoomDetails;
  newAddRooms: any[];
  details: UserDetails;

  exampleHost: ComponentPortal<any>;

  constructor(
    private router: Router,
    private sender: SendService,
    private auth: AuthenticationService,
    private dialog: MatDialog,
    private _fb: FormBuilder

  ) { }

  ngOnInit() {
    this.getUserDetails();

  }

  createRate() {
    return this._fb.group({
      rate_type: [null, Validators.required],
      rate_value: [null, Validators.required]
    });
  }

  createRoom() {
    return this._fb.group({
      room_name: [null, Validators.required],
      room_number: [null, Validators.required],
      base_price: [null, Validators.required],
      ex_person_charge: [null, Validators.required],
      ex_bed_charge: [null, Validators.required],
      no_of_rooms: [null, Validators.required],
      occup_base: [null, Validators.required],
      occup_max: [null, Validators.required],
      occup_ex_beds: [null, Validators.required],
      userid: [this.details._id],
      property: [this.details.properties[0]],
      room_numbers: [null],
      rates: this._fb.array([ this.createRate() ])
    });
  }

  addRoom() {
    const items = this.myForm.get('rooms') as FormArray;
    items.push(this.createRoom());
  }

  addRate(i: number) {
    const items = this.myForm.get(`rooms.${i}.rates`) as FormArray;
    console.log(i, items);

    items.push(this.createRate());
  }

  removeRoom(i: number) {
    const control = <FormArray>this.myForm.controls['rooms'];
    control.removeAt(i);
  }

  removeRate(i: number) {
    const control = this.myForm.get(`rooms.${i}.rates`) as FormArray;
    control.removeAt(i);
  }

  save(model: any) {
    // call API to save
    // ...
    console.log(model.value);
    
    this.sender.addRooms(model.value)
    .subscribe(
      data => {
        this.router.navigate(['/profile']);
      },
      error => {}
    );
}





  addCard () {
    this.divCount.push(1);
    this.index += 1;
  }

  getUserDetails() {
    this.auth.profile().subscribe(user => {
      this.details = user;
      console.log(user);
      this.myForm = this._fb.group({
        rooms: this._fb.array([ this.createRoom() ])
  
      });
    }, (err) => {
      console.error(err);
    });
  }

  openRateModal () {
    this.RatesDialogRef = this.dialog.open(AddRatesDialogComponent);
  }


  addRooms () {
    let total  = this.index + 1;
    let str = '[';
    let hundred_num = 100;
    for (let i = 0; i < total; i++) {
      str += '{"name": "' + this.name[i] + '", "base_price": ' + this.base_price[i] + ', "ex_person_charge": ' + this.ex_person_charge[i] + ', "ex_bed_charge": ' + this.ex_bed_charge[i] + ', "no_of_rooms": ' + this.no_of_rooms[i] + ', "occup_base": ' + this.occup_base[i] + ', "occup_max": ' + this.occup_max[i] + ', "occup_ex_beds": ' + this.occup_ex_beds[i] + ', "userid": "' + this.details._id + '", "property": "' + this.details.properties[0] + '",';
      
      str += ' "room_numbers": [';
      for(let j = 0; j < this.no_of_rooms[i]; j++) {
     
        if ( j < this.no_of_rooms[i] - 1) {
          str += (j + hundred_num) + ',';
        }
        if ( j === this.no_of_rooms[i] - 1 ) {
          str += (j + hundred_num) + ']';
        }
      }
      if(i < total - 1) {
      str += '},';
      }
      if(i === total - 1) {
        str += '}';
      }
      hundred_num += 100;
    }
    str += ']';

    this.newAddRooms = <any>(str);
    str = JSON.stringify(this.newAddRooms);
    
    

    this.sender.addRooms(this.newAddRooms)
    .subscribe(
      data => {
        this.router.navigate(['/profile']);
      },
      error => {}
    );
  }
}



export interface RoomDetails {
  name?: string;
  room_number: number[];
  base_price?: number;
  ex_person_charge?: number;
  ex_bed_charge?: number;
  no_of_rooms?: number;
  occup_base?: number;
  occup_max?: number;
  occup_ex_beds?: number;
  userid?: string;
  property?: string;
}
