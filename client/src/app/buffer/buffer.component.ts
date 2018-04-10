import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Customer } from '../_models/rooms.interface';
import { RateComponent } from '../rate/rate.component';

@Component({
  selector: 'app-buffer',
  templateUrl: './buffer.component.html',
  styleUrls: ['./buffer.component.css']
})
export class BufferComponent implements OnInit {
  public myForm: FormGroup;

  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
      this.myForm = this._fb.group({
          rooms: this._fb.array([ this.createRoom() ])
          // name: ['', [Validators.required, Validators.minLength(5)]],
          // addresses: this._fb.array([])
      });
      
      //add room
      // this.addRoom();
      
      // add address
      
      // this.addAddress();
      
      /* subscribe to addresses value changes */
      // this.myForm.controls['addresses'].valueChanges.subscribe(x => {
      //   console.log(x);
      // })
  }



  initAddress() {
      return this._fb.group({
          street: ['', Validators.required],
          postcode: ['']
      });
  }

  initRate() {
    return this._fb.group({
      rate_type: ['', Validators.required],
      rate_value: [0, Validators.required, Validators.min(1)]
    });
  }

  initRoom() {
    return this._fb.group({
      name: ['', Validators.required],
      room_number: [0, Validators.required, Validators.min(1)],
      base_price: [0, Validators.required, Validators.min(1)],
      ex_person_charge: [0, Validators.required, Validators.min(1)],
      ex_bed_charge: [0, Validators.required, Validators.min(1)],
      no_of_rooms: [0, Validators.required, Validators.min(1)],
      occup_base: [0, Validators.required, Validators.min(1)],
      occup_max: [0, Validators.required, Validators.min(1)],
      occup_ex_beds: [0, Validators.required, Validators.min(1)],
      userid: [''],
      property: [''],
      rates: this._fb.array([ this.createRate() ])
    });
  }

  addAddress() {
      const control = <FormArray>this.myForm.controls['addresses'];
      const addrCtrl = this.initAddress();
      
      control.push(addrCtrl);
      
      /* subscribe to individual address value changes */
      // addrCtrl.valueChanges.subscribe(x => {
      //   console.log(x);
      // })
  }

  createRate() {
    return this._fb.group({
      rate_type: ['', Validators.required],
      rate_value: [0, Validators.required]
    });
  }

  createRoom() {
    return this._fb.group({
      name: ['', Validators.required],
      room_number: [0, Validators.required],
      base_price: [0, Validators.required],
      ex_person_charge: [0, Validators.required],
      ex_bed_charge: [0, Validators.required],
      no_of_rooms: [0, Validators.required],
      occup_base: [0, Validators.required],
      occup_max: [0, Validators.required],
      occup_ex_beds: [0, Validators.required],
      userid: [''],
      property: [''],
      rates: this._fb.array([ this.createRate() ])
    });
  }

  addRoom() {
    const items = this.myForm.get('rooms') as FormArray;
    items.push(this.createRoom());
  }

  addRate() {
    const control = <FormArray>this.myForm.controls['rates'];
    const addrCtrl = this.initRate();
    control.push(addrCtrl);
  }

  removeRoom(i: number) {
    const control = <FormArray>this.myForm.controls['rooms'];
    control.removeAt(i);
  }

  removeRate(i: number) {
    const control = <FormArray>this.myForm.controls['rates'];
    control.removeAt(i);
  }

  removeAddress(i: number) {
      const control = <FormArray>this.myForm.controls['addresses'];
      control.removeAt(i);
  }

  save(model: Customer) {
      // call API to save
      // ...
      console.log(model);
  }
}
