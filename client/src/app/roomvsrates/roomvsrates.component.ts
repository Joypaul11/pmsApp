import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserDetails } from '../authentication.service';
import { SendService } from '../_services/send.service';
import { DataService } from '../_services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-roomvsrates',
  templateUrl: './roomvsrates.component.html',
  styleUrls: ['./roomvsrates.component.css']
})
export class RoomvsratesComponent implements OnInit {
  details: UserDetails;
  allRooms: any;
  constructor(
    private auth: AuthenticationService,
    private sender: SendService,
    private dataService: DataService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getUserDetails();
    this.getAllRooms();
  }

  getUserDetails() {
    this.auth.profile().subscribe(user => {
      this.details = user;
    }, (err) => {
      console.error(err);
    });
  }

  getAllRooms () {
    this.sender.getAllRooms()
    .subscribe(
      data => {
        this.allRooms = data;
      },
      error => {}
    );
  }

  getRate (ev) {
    console.log(ev.target.id);
    const el = ev.target || ev.srcElement || ev.currentTarget;
    const start = el.id.split('-');

    console.log('Room Name - ' + this.allRooms[start[0]].room_name + ', Rate type' + this.allRooms[start[0]].rates[start[1]].rate_type);
    this.dataService.roomName = this.allRooms[start[0]].room_name;
    this.dataService.rateType = this.allRooms[start[0]].rates[start[1]].rate_type;
    this.router.navigate(['/book']);
  }

}
