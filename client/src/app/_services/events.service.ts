import {Injectable} from '@angular/core';
import {Event} from '../_models/events';
@Injectable()
export class EventService {
    get(): Promise<Event[]>{
        return Promise.resolve([
            {id: 1, start_date: "2018-03-05 00:00", end_date: "2018-03-06 01:00", text: "Event 1"},
            {id: 2, start_date: "2018-05-03 00:00", end_date: "2018-09-03 13:00", text: "Event 2"},
        ]);
    }
}
