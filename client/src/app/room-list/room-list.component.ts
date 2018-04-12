import { Component, OnInit } from '@angular/core';
import { SendService } from '../_services/send.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit {
public roomTypes: any;
public allRooms: AllRooms[] = [];
  constructor(
    private sender: SendService,
    private router: Router
  ) { }

  ngOnInit() {  
    this.sender.getAllRooms()
    .subscribe (
      data => {
        this.roomTypes = data;
        for (let rooms of this.roomTypes){
          console.log(JSON.stringify(rooms));
          for (let roo of rooms.room_numbers) {
            console.log(JSON.stringify(roo));
            this.allRooms.push ({
              no: roo,
              name: rooms.room_name
            });
            console.log(JSON.stringify(this.allRooms));
          }
        }
      },
      error => {}
    ) 
  }
  

  gotoAddRoom () {
    this.router.navigate(['/admin-dashboard/add-single-room'])
  }

}

export interface AllRooms {
  no: string;
  name: string;
}
