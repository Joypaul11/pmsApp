import { Component, OnInit } from '@angular/core';
import { SendService } from '../_services/send.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room-types',
  templateUrl: './room-types.component.html',
  styleUrls: ['./room-types.component.css']
})
export class RoomTypesComponent implements OnInit {
  public roomTypes: any;

  constructor(
    private sender: SendService,
    private router: Router
  ) { }

  ngOnInit() {  
    this.sender.getAllRooms()
    .subscribe (
      data => {
        this.roomTypes = data;
      },
      error => {}
    ) 
  }

  gotoAddRoom () {
    this.router.navigate(['/admin-dashboard/add-room-type'])
  }

}
