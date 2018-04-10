import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.css']
})
export class RateComponent implements OnInit {
     // we will pass in address from App component
     @Input('group')
     public adressForm: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
