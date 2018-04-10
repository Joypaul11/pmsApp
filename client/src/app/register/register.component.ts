import { Component } from '@angular/core';
import { AuthenticationService, RegisterTokenPayload } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  credentials: RegisterTokenPayload = {
    email: '',
    name: '',
    password: '',
    location: '',
    properties: [],
    user_type: 'admin'
  };

  type= 'password';

  show = false;

  constructor(private auth: AuthenticationService, private router: Router) {}

  register() {
    this.auth.register(this.credentials).subscribe((data) => {
      if (data.user_type === 'admin') {
        this.router.navigateByUrl('/admin-dashboard');

      } else {
        this.router.navigateByUrl('/add-rooms');
      }
    }, (err) => {
      console.error(err);
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
