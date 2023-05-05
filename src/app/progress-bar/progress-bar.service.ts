import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgressBarService {
  private subject = new BehaviorSubject<boolean>(false);
  readonly subject$ = this.subject.asObservable();

  show(): void {
    this.subject.next(true);
  }

  hide(): void {
    this.subject.next(false);
  }
}
