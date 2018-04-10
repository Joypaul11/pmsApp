import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import 'dhtmlx-scheduler';
import {} from '@types/dhtmlxscheduler';
import {EventService} from '../_services/events.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-scheduler',
  styleUrls: ['scheduler.component.css'],
  templateUrl: 'scheduler.component.html'
})
export class SchedulerComponent implements OnInit {

  @ViewChild('scheduler_here') schedulerContainer: ElementRef;

  constructor(private eventService: EventService){}

  ngOnInit(){
    scheduler.config.xml_date = "%Y-%m-%d %H:%i";
scheduler.init(this.schedulerContainer.nativeElement);
this.eventService.get()
    .then((data) => {
         scheduler.parse(data, "json");
    });
  }
}
