import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Event, NavigationCancel, NavigationError, ResolveEnd, ResolveStart, Router } from '@angular/router';
import { AsyncPipe, NgIf } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ProgressBarService } from './progress-bar.service';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [NgIf, AsyncPipe, MatProgressBarModule],
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressBarComponent implements OnInit {
  spinner$!: Observable<boolean>;

  constructor(private router: Router, private progressBarService: ProgressBarService) {
  }

  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof ResolveStart) {
        this.progressBarService.show();
      }

      if (event instanceof ResolveEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
        this.progressBarService.hide();
      }
    });

    this.spinner$ = this.progressBarService.subject$;
  }
}
