import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dash-panels',
  templateUrl: './dash-panels.component.html',
  styleUrls: ['./dash-panels.component.css']
})
export class DashPanelsComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  gotoRoomTypes () {
    this.router.navigate(['/admin-dashboard/room-types']);
  }

  gotoRoomList () {
    this.router.navigate(['/admin-dashboard/room-list']);
  }

  gotoUserList () {
    this.router.navigate(['/admin-dashboard/users-list']);
  }

  gotoAmenitiesList () {
    this.router.navigate(['/admin-dashboard/amenities-list']);
  }
}
