import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor() {
  }

  debug(...p) {
    console.log.apply(console.log, p);
  }

  error(e: any, ...p) {
    console.error.apply(console, [e, ...p]);
  }
}
