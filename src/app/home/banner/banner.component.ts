import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { fromEvent, merge, Observable, of } from 'rxjs';
import { mapTo } from 'rxjs/operators';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [MatDividerModule],
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BannerComponent implements OnInit {
  online$!: Observable<boolean>;

  constructor() {}

  ngOnInit(): void {
    this.online$ = merge(
      of(navigator.onLine),
      fromEvent(window, 'online').pipe(mapTo(true)),
      fromEvent(window, 'offline').pipe(mapTo(false))
    );
  }
}
