import {Injectable} from '@angular/core';
import {LogService} from './log.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  loading: boolean = false;

  constructor(private log: LogService) {
  }


  run(func: () => Promise<void>): Promise<void> {
    this.loading = true;
    return func()
      .then(() => {
      })
      .catch((e) => {
        this.log.error(e, 'run');
      })
      .then(() => {
        this.loading = false;
      });
  }
}
