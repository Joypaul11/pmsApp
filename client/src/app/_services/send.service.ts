import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { Router } from '@angular/router';

export interface UserDetails {
  _id: string;
  email: string;
  name: string;
  exp: number;
  iat: number;
}

export interface RoomDetails {
  name: string;
  type: string;
  beds: number;
  cost: number;
  img: string;
}

@Injectable()
export class SendService {
  private token: string;

  constructor(private http: HttpClient, private router: Router) {}

  private getToken(): string {
    
      this.token = sessionStorage.getItem('mean-token');
    
    return this.token;
  }

  private request(method: 'post'|'get', type: any, user?: UserDetails | RoomDetails | any): Observable<any> {
    let base;
    var options = {
      headers: { 'Content-Type': ['application/json'] }
    };
    if (method === 'post') {
      base = this.http.post(`/api/${type}`, user, options);
    } else {
      base = this.http.get(`/api/${type}`, { headers: { Authorization: `Bearer ${this.getToken()}` }});
    }

    const request = base.pipe(
        map((data) => {
          return data;
        })
      );
      return request;
    }

    public update(user: UserDetails): Observable<any> {
        return this.request('post', 'update', user);
      }

    public getAllRooms() {
      return this.request('get', 'rooms');
    }

    public addRoom(room) {
      return this.request('post', 'rooms/add', room);
    }

    public getUnbookedRooms() {
      return this.request('get', 'availability');
    }

    public addBooking(bookingDetails) {
      return this.request('post', 'addbooking', bookingDetails);
    }

    public showBookings(allBookingDetails){
      return this.request('post', 'bookings', allBookingDetails);
    }

    public showAllBookings(str) {
      return this.request('post', 'allbookings', str);
    }

    public addProperty(str) {
      return this.request('post', 'property/add', str);
    }

    public addRate(str) {
      return this.request('post', 'rate/add', str);
    }

    public showRooms(str) {
      return this.request('post', 'property/rooms', str);
    }

    public addRooms(sendStr) {
      return this.request('post', 'rooms/add', sendStr);
    }

    public addSingleBooking(sendStr) {
      return this.request('post', 'booking/add', sendStr);
    }

    public addSingleRoom(sendStr) {
      return this.request('post', 'rooms/add/single', sendStr);
    }

    public sendAddUser(sendStr) {
      return this.request('post', 'user/add', sendStr);
    }

    public getUsers (sendStr) {
      return this.request('post', 'user/list', sendStr);
    }

    public sendAddAmenity(sendStr) {
      return this.request('post', 'amenity/add', sendStr);
    }

    public getAllAmenity() {
      return this.request('get', 'amenity/list');
    }
}
