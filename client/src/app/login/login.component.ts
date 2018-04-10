import { Component } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../authentication.service';
import { Router } from '@angular/router';
import { AlertService } from '../_services/index';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials: TokenPayload = {
    email: '',
    password: ''
  };

  type= 'password';

  show = false;

  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private alertService: AlertService
  ) {}

  login() {
    this.auth.login(this.credentials).subscribe((data) => {
      if (data.user_type === 'admin') {
        this.router.navigateByUrl('/admin-dashboard');
      } else {
        this.router.navigateByUrl('/frontdesk');
      }
    }, (err) => {
      console.error(err);
      this.alertService.error('Invalid password, please try again!');
    });
  }

  toggleShow()
    {
        this.show = !this.show;
        if (this.show){
            this.type = "text";
        }
        else {
            this.type = "password";
        }
    }
}
