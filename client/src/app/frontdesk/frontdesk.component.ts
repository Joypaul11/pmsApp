import { Component, OnInit, Inject, AfterViewInit, ElementRef, Renderer, ViewChild, Input, ViewChildren, Directive, Renderer2, QueryList } from '@angular/core';
import { TokenPayload } from '../authentication.service';
import { AuthenticationService, UserDetails } from '../authentication.service';
import { SendService } from '../_services/send.service';
import {CalendarModule as TheCalendar} from 'primeng/calendar';
import {ScheduleModule} from 'primeng/schedule';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';

import {AlertService} from '../_services/alert.service';

import { WindowRefService } from '../_services/WindowRef.service';
import { ModalService } from '../_services/index';

import { AddCalendarDialogComponent } from '../add-calendar-dialog/add-calendar-dialog.component';
import { ShowBookingDialogComponent } from '../show-booking-dialog/show-booking-dialog.component';

import * as moment from 'moment';

import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';

import { Router } from '@angular/router';

import { DataService } from '../_services/data.service';





declare var jquery: any;
declare var $: any;


import {IMyDpOptions} from 'mydatepicker';

@Component({
  selector: 'app-frontdesk',
  templateUrl: './frontdesk.component.html',
  styleUrls: ['./frontdesk.component.css']
})
export class FrontdeskComponent implements OnInit {
  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'yyyy-mm-dd',
    inline: true,
    selectorHeight: '200px',
    selectorWidth: '200px'
};

// Initialized to specific date (09.10.2018).

  
public model: any = { date: {  year: moment().format('YYYY'),
month: moment().format('MM'),
day: moment().format('DD')
} };
  



@ViewChildren('tableCell') allCells: QueryList<ElementRef>;
@ViewChildren('tableCell') cell: ElementRef;

public overPosTop = 0;
public overPosLeft = 0;
public overWidth = 0;
public overHeight = 0;
public isAdmin = false;
CalendarDialogRef: MatDialogRef<AddCalendarDialogComponent>;
ShowBookingDialogRef: MatDialogRef<ShowBookingDialogComponent>;

private _window: Window;

details: any;
value: Date;
updatedDetails: UserDetails;
allRooms: RoomDetails[] = [];
newProperty= '';
selIndex = 0;
allBookingsData: any;
seletedIndex = 0;
selectedProperty = null;

bookState = false;
bookedState = false;

newRoom: RoomDetails = { 
  name: '',
  room_numbers: [],
  base_price: 0,
  ex_person_charge: 0,
  ex_bed_charge: 0,
  no_of_rooms: 0,
  occup_base: 0,
  occup_max: 0,
  occup_ex_beds: 0,
  userid: '',
  property: ''
};
bookevent: Event = {
  id: null,
  title: '',
  start: '',
  end: ''
};

bookingDetails: RoomBookingDetails = {
  name: '',
  email: '',
  room_name: '',
  userid: '',
  bookStartDate: null,
  bookEndDate: null,
  property: null,
  room_number: null
};

propertyDetail: PropertyDetail = {
  userid: null,
  property_name: null,
  a_userid: null
};

showBookingDetails: ShowBookingDetails = {
  userid: '',
  email: '',
};

allBookings: AllBookings = {
  userid: null,
  property: null
};

showFiller = false;
profileState = 'profile';
public divCount = [];
public e_count = 0;
public r_count = 0;
public o_count = 0;
public propertyName = 'Property4';

public event: any;
public events: any;
public headerConfig: any;
public calendarOptions: any;

public selProperty = 'Diki Inn';

public calendar_dates = [];
public calendar_state = 'month';
public boxes: Boxes[] = [];

public appDate: AppDate[] = [];

public sDate: string[] = [];

public selectedTable: any;
public selectedRow: any;
public selectedCell: any;

public endCell = null;

public startDate = '';
public endDate = '';

public myStyles=null;

public calendarState = 'month';
public prevCounter = 0;
public u_details: any;

public calendarColspan = 30;
clearFlag = false;
startCell = null;
dragging = false;
finalCell = null;

public myForm: FormGroup;


constructor(
  private auth: AuthenticationService,
  private elementRef: ElementRef,
  private sender: SendService,
  private renderer: Renderer,
  private render: Renderer2,
  windowRef: WindowRefService,
  private modalService: ModalService,
  private dialog: MatDialog,
  private _fb: FormBuilder,
  private alertService: AlertService,
  private router: Router,
  private dataService: DataService
) {
  this._window = windowRef.nativeWindow;

  this.setCalendar('month');

}





ngOnInit() {
  this.u_details = this.auth.getUserDetails();
  console.log(this.u_details);
  if(this.u_details.user_type === 'admin') {
    this.isAdmin = true;
  }
  const buff_date = {
    date:
    {
      year: moment().add(-5, 'day').format('YYYY'),
      month: moment().add(-5, 'day').format('MM'),
      day: moment().add(-5, 'day').format('DD')
    }
  };
  this.model = buff_date;
  console.log('Buff date : ' + JSON.stringify(this.model));

  this.bookingDetails.bookStartDate = new Date;
  this.bookingDetails.bookEndDate = new Date;
  this.profileState = 'dashboard';
  this.getUserDetails();
  this.getAllRooms();
}

onDateChanged(event) {
  // event properties are: event.date, event.jsdate, event.formatted and event.epoc
  console.log(event.date, event.formatted);
  this.model = event;
  this.setCalendarAgain(this.calendarState, 0);
}

getdata():string { 
  return this.dataService.serviceData;
} 
setdata(value: string) { 
  this.dataService.roomNumber = value; 
} 

ngAfterViewInit() {
  console.log(this.myForm);
  this.allCells.changes.subscribe(() => {
    /*this.allCells.toArray().forEach(el => {
        console.log(el.nativeElement.id);
    });*/
  });



   }



   setCalendar (type: string) {
     console.log('Model date' + JSON.stringify(this.model.date));
     this.boxes = [];
     this.appDate = [];
     this.sDate = [];
    if (type === 'month') {
      for (let i = -5; i < 25; i++) {
        let check = false;
        if (moment(this.model.date).add(i, 'day').isAfter(moment())) {
          check = true;
        }
        if (moment(this.model.date).add(i, 'day').isSame(moment())) {
          check = true;
        }
        console.log(moment(this.model.date).add(-1, 'month').add(i, 'day').format('MMM'));
        console.log(moment(this.model.date).add(-1, 'month').add(i, 'day').format('DD ddd'));
        this.appDate.push({
          month: moment(this.model.date).add(-1, 'month').add(i, 'day').format('MMM'),
          day: moment(this.model.date).add(-1, 'month').add(i, 'day').format('DD ddd'),
          today: false
        }
        
      );

      this.sDate.push(moment(this.model.date).add(i, 'day').format('YYYY-MM-DD'));
  
        this.calendar_dates.push(moment().add(i, 'day').format('DD ddd'));
        
        this.boxes.push({
          date: moment(this.model.date).add(-1, 'month').add(i, 'day').format('YYYY-MM-DD'),
          state: 'default',
          value: null,
          disp: check,
          today: false
        });
        
      }
      this.setTodayColor();
    }
  
    if (type === 'week') {
      this.boxes = [];
      this.appDate = [];
      for (let i = -1; i < 6; i++) {
        let check = false;
        if (moment(this.model.date).add(i, 'day').isAfter(moment())) {
          check = true;
        }
        if (moment(this.model.date).add(i, 'day').isSame(moment())) {
          check = true;
        }
        this.appDate.push({
          month: moment(this.model.date).add(-1, 'month').add(i, 'day').format('MMM'),
          day: moment(this.model.date).add(-1, 'month').add(i, 'day').format('DD ddd'),
          today: false
        }
      );
      this.sDate.push(moment(this.model.date).add(i, 'day').format('YYYY-MM-DD'));

        this.calendar_dates.push(moment(this.model.date).add(i, 'day').format('DD ddd'));
  
        this.boxes.push({
          date: moment(this.model.date).add(-1, 'month').add(i, 'day').format('YYYY-MM-DD'),
          state: 'default',
          value: null,
          disp: check,
          today: false
        });
      }
      this.setTodayColor();
    }

    if (type === 'day') {
      this.boxes = [];
      this.appDate = [];
      for (let i = 0; i < 1; i++) {
        let check = false;
        if (moment(this.model.date).add(i, 'day').isAfter(moment())) {
          check = true;
        }
        if (moment(this.model.date).add(i, 'day').isSame(moment())) {
          check = true;
        }
        this.appDate.push({
          month: moment(this.model.date).add(-1, 'month').add(i, 'day').format('MMM'),
          day: moment(this.model.date).add(-1, 'month').add(i, 'day').format('DD ddd'),
          today: false
        }
      );
      this.sDate.push(moment(this.model.date).add(i, 'day').format('moment.HTML5_FMT.DATE'));

        this.calendar_dates.push(moment(this.model.date).add(i, 'day').format('DD ddd'));
  
        this.boxes.push({
          date: moment(this.model.date).add(-1, 'month').add(i, 'day').format('YYYY-MM-DD'),
          state: 'default',
          value: null,
          disp: check,
          today: false
        });
      }
      this.setTodayColor();
    }
   }


   setCalendarAgain (type: string, offset: number) {
    this.boxes = [];
    this.appDate = [];
    this.sDate = [];
   if (type === 'month') {
     this.calendarState = 'month';
     this.calendarColspan = 30;
     for (let i = 0; i < 30; i++) {
       let check = false;
       if (moment(this.model.date).add(i + offset, 'day').isAfter(moment())) {
         check = true;
       }
       if (moment(this.model.date).add(i + offset, 'day').isSame(moment())) {
         check = true;
       }
       console.log(moment(this.model.date).add(i - 1 + offset).format('MMM'));
       this.appDate.push({
         month: moment(this.model.date).add(-1, 'month').add(i + offset, 'day').format('MMM'),
         day: moment(this.model.date).add(-1, 'month').add(i + offset, 'day').format('DD ddd'),
         today: false
       }
       
     );

     this.sDate.push(moment(this.model.date).add(i + offset, 'day').format('YYYY-MM-DD'));
 
       this.calendar_dates.push(moment(this.model.date).add(i + offset, 'day').format('DD ddd'));
 
       this.boxes.push({
         date: moment(this.model.date).add(-1, 'month').add(i + offset, 'day').format('YYYY-MM-DD'),
         state: 'default',
         value: null,
         disp: check,
         today: false
       });
     }

     this.setTableColors();
   }
 
   if (type === 'week') {
     this.calendarState = 'week';
     this.calendarColspan = 7;
     this.boxes = [];
     this.appDate = [];
     for (let i = 0; i < 7; i++) {
       let check = false;
       if (moment(this.model.date).add(i + offset, 'day').isAfter(moment())) {
         check = true;
       }
       if (moment(this.model.date).add(i + offset, 'day').isSame(moment())) {
         check = true;
       }
       this.appDate.push({
         month: moment(this.model.date).add(-1, 'month').add(i - 1 + offset, 'day').format('MMM'),
         day: moment(this.model.date).add(-1, 'month').add(i + offset, 'day').format('DD ddd'),
         today: false
       }
     );
     this.sDate.push(moment(this.model.date).add(i + offset, 'day').format('YYYY-MM-DD'));

       this.calendar_dates.push(moment(this.model.date).add(i + offset, 'day').format('DD ddd'));
 
       this.boxes.push({
         date: moment(this.model.date).add(-1, 'month').add(i + offset, 'day').format('YYYY-MM-DD'),
         state: 'default',
         value: null,
         disp: check,
         today: false
       });
     }
    this.setTableColors();
   }

   if (type === 'day') {
     this.calendarState = 'day';
     this.calendarColspan = 1;
     this.boxes = [];
     this.appDate = [];
     for (let i = 0; i < 1; i++) {
       let check = false;
       if (moment(this.model.date).add(i + offset, 'day').isAfter(moment())) {
         check = true;
       }
       if (moment(this.model.date).add( i + offset, 'day').isSame(moment())) {
         check = true;
       }
       this.appDate.push({
         month: moment(this.model.date).add(-1, 'month').add(i + offset, 'day').format('MMM'),
         day: moment(this.model.date).add(-1, 'month').add(i + offset, 'day').format('DD ddd'),
         today: false
       }
     );
     this.sDate.push(moment(this.model.date).add(i + offset, 'day').format('moment.HTML5_FMT.DATE'));

       this.calendar_dates.push(moment(this.model.date).add(i + offset, 'day').format('DD ddd'));
 
       this.boxes.push({
         date: moment(this.model.date).add(-1, 'month').add(i + offset, 'day').format('YYYY-MM-DD'),
         state: 'default',
         value: null,
         disp: check,
         today: false
       });
     }
     this.setTableColors();
   }
  }

  calendarScroll (scroll) {
    this.prevCounter += scroll;
    if (this.calendarState === 'month') {
      this.setCalendarAgain('month', 30 * this.prevCounter);
    }
    if (this.calendarState === 'week') {
      this.setCalendarAgain('week', 7 * this.prevCounter);

    }
    if (this.calendarState === 'day') {
      this.setCalendarAgain('day', 1 * this.prevCounter);
    }
  }

  calendarUnscroll (scroll) {
    this.prevCounter = 0;
    if (this.calendarState === 'month') {
      this.setCalendarAgain('month', 30 * this.prevCounter);
    }
    if (this.calendarState === 'week') {
      this.setCalendarAgain('week', 7 * this.prevCounter);

    }
    if (this.calendarState === 'day') {
      this.setCalendarAgain('day', 1 * this.prevCounter);
    }
  }


  setTodayColor () {

    for (let day of this.appDate) {
      if (day.day === moment().format('DD ddd')) {
        day.today = true;
      }
    }
  }
  

   onClick(event) {
    console.log(event);
  }

  mousePress(ev) {
    let el = ev.target || ev.srcElement || ev.currentTarget;
    
    if (el.classList.contains('booked-class')) {
      this.showBooking(el.id);
    } else {
      this.dragging = true;
    this.overPosTop = el.offsetTop;
    this.overPosLeft = el.offsetLeft;
    this.overWidth = el.offsetWidth;
    this.overHeight = el.offsetHeight;
    
    /*

    this.myStyles = {
      'z-index': 9999,
      'background-color': 'red',
      'height': this.overHeight + 'px',
      'width': this.overWidth + 'px',
      'position': 'absolute',
      'top': this.overPosTop + 'px',
      'left': this.overPosLeft + 'px',
      'overflow': 'hidden'
      };*/

    el.classList.remove('ui-state-default');
    el.classList.add('eng-selected-item');
    const start = el.id.split('-');
    console.log('Start Cell : Room Cat-' + this.allRooms[start[1]].name +', Room No.-' + this.allRooms[start[1]].room_numbers[start[2]] + ', Date- ' + this.appDate[start[3]].month + ' ' + this.appDate[start[3]].day);
    this.startDate = 'From- ' + this.appDate[start[3]].month + ' ' + this.appDate[start[3]].day;
    this.dataService.startDate = this.sDate[start[3]].toString();
    this.dataService.property = this.selectedProperty; }
    // this.el.nativeElement.
  }

  mouseHover(ev) {
    if (this.dragging) {
    let el = ev.target || ev.srcElement || ev.currentTarget;
    el.classList.remove('ui-state-default');
    el.classList.add('eng-selected-item');
  }
  }

  mouseUnpress(ev) {
    if (this.dragging) {
      let el = ev.target || ev.srcElement || ev.currentTarget;
      const end = el.id.split('-');
      console.log('End Cell : Room Cat-' + this.allRooms[end[1]].name +', Room No.-' + this.allRooms[end[1]].room_numbers[end[2]] + ', Date- ' + this.calendar_dates[end[3]]);
      this.endDate = 'To - ' + this.appDate[end[3]].month + ' ' + this.appDate[end[3]].day;
      this.dataService.endDate = this.sDate[end[3]].toString();
      this.dragging = false;
      this.CalendarDialogRef = this.dialog.open(AddCalendarDialogComponent, {
        data: {
          startDate: this.startDate,
          endDate: this.endDate,
          roomNumber: this.allRooms[end[1]].room_numbers[end[2]]
        }
      });
    
    }
  }

  showBooking (tableID: any) {
    const indexes = tableID.split('-');
    for ( let booking of this.allBookingsData ) {
        if (booking.room_number === this.allRooms[indexes[1]].room_numbers[indexes[2]].toString()) {
          if ( moment(this.boxes[indexes[3]].date).isBetween(booking.arrival, booking.departure) || moment(this.boxes[indexes[3]].date).isSame(booking.arrival) || moment(this.boxes[indexes[3]].date).isSame(booking.departure)) {
            this.ShowBookingDialogRef = this.dialog.open(ShowBookingDialogComponent, {
              data: {
                booking: booking,
              }
            });
          }
        } 
    }
  }

  createRate(rate: string) {
    return this._fb.group({
      rate_type: [ rate, Validators.required],
      rate_value: [null, Validators.required],
      vat_rate: [null]
    });
  }


addRate(i: number, rate: string) {
  const items = this.myForm.get(`rates`) as FormArray;
  console.log(i, items);

  items.push(this.createRate(rate));
}

getUserDetails() {
  this.auth.profile().subscribe(user => {
    this.details = user;
    this.myForm = this._fb.group({
      room_name: [null, Validators.required],
      base_price: [null, Validators.required],
      ex_person_charge: [null, Validators.required],
      ex_bed_charge: [null, Validators.required],
      no_of_rooms: [null, Validators.required],
      occup_base: [null, Validators.required],
      occup_max: [null, Validators.required],
      occup_ex_beds: [null, Validators.required],
      userid: [this.details._id],
      property: [this.details.properties[0]],
      room_numbers: [null],
      rates: this._fb.array([ this.createRate(this.details.rates[0]) ])

    });
    for (var i=1; i<this.details.rates.length; i++) {
      this.addRate(i, this.details.rates[i]); 
    }
    if(this.details.properties){
      if(this.selectedProperty === null) {
      this.selectedProperty = this.details.properties[0];
      }
    this.propertyDetail.property_name = this.selectedProperty;
    this.showRooms();
    
  this.showAllBookings();
    }
  }, (err) => {
    console.error(err);
  });
}

addRoomSubmit (form: any) {
  console.log(form.value);
  let hun = 0;
  if (this.allRooms.length > 0){
    hun = ((this.allRooms[this.allRooms.length - 1].room_numbers[0] / 100) + 1) * 100;
  } else {
    hun = 100;
  }
  form.value.room_numbers = [];
  for (var i=0; i<form.value.no_of_rooms; i++) {
    form.value.room_numbers.push(i+hun);
  }
  this.alertService.success('Room added', false);
  this.sender.addRooms(form.value)
  .subscribe(
    data => {
      this.ngOnInit();

      hun += 100;
    },
    error => {}
  );
}

goToAddRate () {
  this.router.navigate(['/add-rates']);
}

getAllRooms () {
  this.sender.getAllRooms()
  .subscribe(
    data => {
      
        
        console.log(JSON.stringify(this.allRooms))
      
    },
    error => {}
  );
}

selectProperty(property_name) {
  console.log(property_name);
  this.selectedProperty = property_name;
  this.propertyDetail.property_name = property_name;
  this.showRooms();
  
  this.showAllBookings();
}

showRooms () {
  this.propertyDetail.userid = this.details._id;
  this.propertyDetail.a_userid = this.u_details.a_userid;
  this.sender.showRooms(this.propertyDetail)
    .subscribe(
      data => {
        this.allRooms = data;
      },
      error => {}
    );
}
/*Expandable modal form*/
// Clone the hidden element and shows it
addOne () {
$('.dynamic-element').first().clone().appendTo('.dynamic-stuff').show();
this.attach_delete();
}

showRespectiveRooms(index) {
console.log("here i get the index" + JSON.stringify(index));
this.bookingDetails.room_name = this.allRooms[index].name;
this.selIndex = index;
}

// Attach functionality to delete buttons
attach_delete() {
$('.delete').off();
$('.delete').click(function(){
  console.log("click");
  $(this).closest('.form-group').remove();
});
}



/*Expandable modal form ends*/

addProperty () {
  this.propertyDetail.userid = this.details._id;
  this.propertyDetail.property_name = this.newProperty;
  this.sender.addProperty(this.propertyDetail)
  .subscribe(
    data => {
      this.getUserDetails();
    },
    error => {}
  )
}

updateProfile() {
  this.sender.update(this.details).subscribe(user => {
  });
}


addUserField () {
  this.divCount.push(1);
  this.e_count += 1;
  this.r_count += 1;
  this.o_count += 1;
}



addRoom () {
  this.selectedProperty = this.newRoom.property;
  this.showRooms();
  
  this.showAllBookings();
  this.newRoom.userid = this.details._id;
  const h = 100 * (this.allRooms.length + 1);
  for (let i = 1; i <= this.newRoom.no_of_rooms; i++) {
    this.newRoom.room_numbers.push(h + i);
  }
  let str = JSON.stringify(this.newRoom);
  str = str.replace('{', '[{');
  str = str.replace('}', '}]');

  this.sender.addRoom (str)
  .subscribe(
    data => {
      this.ngOnInit();
    },
    error => {}
  );
}

getUnbookedRooms () {
  this.sender.getUnbookedRooms()
  .subscribe(
    data => {},
    error => {}
  );
}

addBooking () {
  console.log("date ::::::::::::" + this.value);
  this.bookingDetails.room_name = this.allRooms[this.selIndex].name;
  this.bookingDetails.userid = this.details._id;
  this.bookingDetails.property = this.selectedProperty;
  this.sender.addBooking(this.bookingDetails)
  .subscribe(
    data => {
      this.ngOnInit();
      this.profileState = 'profile';
    },
    error => {}
  );

 
}

showBookings () {
  this.showBookingDetails.email = 'abc@abc.com';
  this.showBookingDetails.userid = this.details._id;
  this.sender.showBookings(this.showBookingDetails)
  .subscribe(
    data => {},
    error => {}
  );
}

showAllBookings () {
  this.allBookings.userid = this.details._id;
  this.allBookings.property = this.selectedProperty;
  this.events = [];
  this.sender.showAllBookings(this.allBookings)
  .subscribe(
    data => {
      this.allBookingsData = data;
      this.setTableColors();
    },
    error => {}
  );
}

setTableColors () {
  for (let booking of this.allBookingsData) {
    let color = false;
    for (let i = 0; i <= this.boxes.length - 1; i++) {
      if (color === true) {
        this.boxes[i].state = 'booked';
        this.boxes[i].value = booking.room_number;
      }
      if (this.boxes[i].date === booking.arrival || moment(this.boxes[i].date).isBetween(booking.arrival, booking.departure)) {
        this.boxes[i].state = 'booked';
        this.boxes[i].value = booking.room_number;
        color = true;
      }
      if (this.boxes[i].date === booking.departure) {
        color = false;
      }
     }
  }
  this.setTodayColor();
}

removeUserField () {
  this.divCount.pop();
}

setClickedCells(cat_index, room_index, date_index) {
  console.log('This is the index', cat_index, room_index, date_index);
  if (this.startCell === null) {
    this.startCell = date_index;
  }
  if (this.endCell === null) {
    this.endCell = date_index;
  }

  this.selectedTable = cat_index;
  this.selectedRow = room_index;
  this.selectedCell = date_index;


}

}

export interface AllBookings {
userid: string;
property: string;
}

export interface RoomDetails {
name: string;
room_numbers: number[];
base_price: number;
ex_person_charge: number;
ex_bed_charge: number;
no_of_rooms: number;
occup_base: number;
occup_max: number;
occup_ex_beds: number;
userid: string;
property: string;
}

export interface RoomBookingDetails {
name: string;
email: string;
bookStartDate: Date;
bookEndDate: Date;
userid: string;
property: string;
room_name: string;
room_number: number;
}

export interface ShowBookingDetails {
userid: string;
email: string;
}

export interface PropertyDetail {
userid: string;
property_name: string;
a_userid: string;
}

export interface Event {
id: number;
title: string;
start: string;
end: string;
}

export interface AppDate {
month: string;
day: string;
today: boolean;
}

export interface Boxes {
state: string;
value: string;
disp: boolean;
date: string;
today: boolean;
}




