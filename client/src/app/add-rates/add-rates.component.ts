import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserDetails } from '../authentication.service';
import { SendService } from '../_services/send.service';


@Component({
  selector: 'app-add-rates',
  templateUrl: './add-rates.component.html',
  styleUrls: ['./add-rates.component.css']
})
export class AddRatesComponent implements OnInit {
  rate: RateDetail = {
    userid: null,
    rate_type: null
  };
  public rateType = null;
  details: UserDetails;

  constructor(
    private auth: AuthenticationService,
    private sender: SendService
  ) { }

  ngOnInit() {
    this.getUserDetails();
  }

  getUserDetails() {
    this.auth.profile().subscribe(user => {
      this.details = user;
      this.rateType = null;
      
    }, (err) => {
      console.error(err);
    });
  }


  addRate () {
    
      this.rate.userid = this.details._id;
      this.rate.rate_type = this.rateType;
      this.sender.addRate(this.rate)
      .subscribe(
        data => {
          this.getUserDetails();
        },
        error => {}
      )
    
  }
}

export interface RateDetail {
  userid: string;
  rate_type: string;
}