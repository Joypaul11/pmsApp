import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import {MatDialogModule} from '@angular/material/dialog';
import {MatMenuModule} from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select';

import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { BufferComponent } from './buffer/buffer.component';

import { AuthenticationService } from './authentication.service';
import { AuthGuardService } from './auth-guard.service';
import { SendService } from './_services/send.service';
import {ScheduleModule} from 'primeng/schedule';
import { CalendarModule } from 'angular-calendar';
import { CalendarModule as TheCalendar} from 'primeng/calendar';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

// import alert service and component
import { AlertComponent } from './_directives/index';
import { AlertService } from './_services/index';
import { CalendarComponent } from './calendar/calendar.component';
import { AddRoomsComponent } from './add-rooms/add-rooms.component';
import { CardtemplateComponent } from './cardtemplate/cardtemplate.component';
import { SchedulerComponent } from './scheduler/scheduler.component';
import { ModalComponent } from './_directives/modal.component';


import {EventService} from './_services/events.service';
import { LayoutComponent } from './layout/layout.component';
import { WindowRefService  } from './_services/WindowRef.service';

import { ModalService  } from './_services/modal.service';
import { AddCalendarDialogComponent } from './add-calendar-dialog/add-calendar-dialog.component';
import { AddRatesDialogComponent } from './add-rates-dialog/add-rates-dialog.component';
import { RateComponent } from './rate/rate.component';
import { BookComponent } from './book/book.component';
import { RoomvsratesComponent } from './roomvsrates/roomvsrates.component';
import { AddRatesComponent } from './add-rates/add-rates.component';
import { DataService } from './_services/data.service';
import { ShowBookingDialogComponent } from './show-booking-dialog/show-booking-dialog.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { FrontdeskComponent } from './frontdesk/frontdesk.component';

import {MatDatepickerModule} from '@angular/material/datepicker';
import { MyDatePickerModule } from 'mydatepicker';
import { RoomTypesComponent } from './room-types/room-types.component';
import { RoomListComponent } from './room-list/room-list.component';
import { AddRoomTypeComponent } from './add-room-type/add-room-type.component';
import { AmenitiesListComponent } from './amenities-list/amenities-list.component';
import { AddAmenitiesComponent } from './add-amenities/add-amenities.component';
import { AddSingleRoomComponent } from './add-single-room/add-single-room.component';
import { DashPanelsComponent } from './dash-panels/dash-panels.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserAddComponent } from './user-add/user-add.component';
import { AmenityAddComponent } from './amenity-add/amenity-add.component';

import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent,
    children: [
      // { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'room-types', component: RoomTypesComponent },
      { path: 'room-list', component: RoomListComponent },
      { path: 'add-room-type', component: ProfileComponent},
      { path: 'amenities-list', component: AmenitiesListComponent },
      { path: 'amenity-add', component: AmenityAddComponent },
      { path: 'add-single-room', component: AddSingleRoomComponent },
      { path: 'users-list', component: UserListComponent },
      { path: 'user-add', component: UserAddComponent },
      { path: '', component: DashPanelsComponent}
    ]
  },
  { path: 'buffer', component: BufferComponent},
  { path: 'frontdesk', component: FrontdeskComponent},
  { path: 'pms', component: LayoutComponent},
  { path: 'login', component: LoginComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'book', component: BookComponent },
  { path: 'add-rates', component: AddRatesComponent },
  { path: 'room-rates', component: RoomvsratesComponent},
  { path: 'add-rooms', component: AddRoomsComponent, canActivate: [AuthGuardService] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    AlertComponent,
    HomeComponent,
    CalendarComponent,
    AddRoomsComponent,
    CardtemplateComponent,
    SchedulerComponent,
    LayoutComponent,
    ModalComponent,
    AddCalendarDialogComponent,
    AddRatesDialogComponent,
    BufferComponent,
    RateComponent,
    BookComponent,
    RoomvsratesComponent,
    AddRatesComponent,
    ShowBookingDialogComponent,
    AdminDashboardComponent,
    FrontdeskComponent,
    RoomTypesComponent,
    RoomListComponent,
    AddRoomTypeComponent,
    AmenitiesListComponent,
    AddAmenitiesComponent,
    AddSingleRoomComponent,
    DashPanelsComponent,
    UserListComponent,
    UserAddComponent,
    AmenityAddComponent
  ],
  entryComponents: [
    CardtemplateComponent,
    AddCalendarDialogComponent,
    AddRatesDialogComponent,
    ShowBookingDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    TheCalendar,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ScheduleModule,
    MatDialogModule,
    MatMenuModule,
    MatCardModule,
    MatInputModule,
    MyDatePickerModule,
    MatButtonModule,
    MatSidenavModule,
    MatDatepickerModule,
    MatListModule,
    MatSelectModule,
    MatExpansionModule,
    AngularMultiSelectModule,
    NgbModule.forRoot(),
    CalendarModule.forRoot()
  ],
  providers: [
    AuthenticationService,
    AuthGuardService,
    AlertService,
    SendService,
    EventService,
    WindowRefService,
    ModalService,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
