import { Component, OnInit } from '@angular/core';
import { SendService } from '../_services/send.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-amenities-list',
  templateUrl: './amenities-list.component.html',
  styleUrls: ['./amenities-list.component.css']
})
export class AmenitiesListComponent implements OnInit {
  public allAmenities: any;
  constructor(
    private sender: SendService,
    private router: Router
  ) { }

  ngOnInit() {
    this.sender.getAllAmenity()
    .subscribe (
      data => {
        this.allAmenities = data;
      },
      error => {}
    );
  }

  gotoAddAmenity () {
    this.router.navigate(['/admin-dashboard/amenity-add']);
  }
}
