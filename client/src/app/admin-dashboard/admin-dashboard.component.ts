import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  public routed = true;

  constructor(
    private auth: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.routed = true;
  }

  gotoRoomTypes () {
    this.routed = false;
    this.router.navigate(['/admin-dashboard/room-types']);
  }

  gotoRoomList () {
    this.routed = false;
    this.router.navigate(['/admin-dashboard/room-list']);
  }
}
