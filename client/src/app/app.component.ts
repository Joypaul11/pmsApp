import { Component } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import 'hammerjs';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public auth: AuthenticationService) {}
}
