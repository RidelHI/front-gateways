import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  subjectSectionName: Subject<string>;

  constructor() {
    this.subjectSectionName = new Subject<string>();
  }
}
