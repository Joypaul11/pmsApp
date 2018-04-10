import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SendService } from '../_services/send.service';
import { AuthenticationService } from '../authentication.service';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  public u_details: any;
  public userList: any;
  constructor(
    private router: Router,
    private sender: SendService,
    private auth: AuthenticationService
  ) { }

  ngOnInit() {
    this.u_details = this.auth.getUserDetails();
    if (this.u_details._id) {
      this.sender.getUsers(this.u_details)
      .subscribe (
        data => {
          this.userList = data;
        },
        error => {}
      );
    }
  }

  gotoAddUser () {
    this.router.navigate(['/admin-dashboard/user-add']);
  }
}
