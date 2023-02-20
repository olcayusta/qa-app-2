import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Tag } from '@models/tag.model';
import { Observable } from 'rxjs';
import { WatchedTagService } from './watched-tag.service';
import { AsyncPipe, NgForOf } from '@angular/common';

@Component({
  selector: 'inek-watched-tags',
  standalone: true,
  imports: [
    NgForOf,
    AsyncPipe
  ],
  templateUrl: './watched-tags.component.html',
  styleUrls: ['./watched-tags.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WatchedTagsComponent implements OnInit {
  tags$!: Observable<Tag[]>;

  constructor(private watchedTagService: WatchedTagService) {
  }

  ngOnInit(): void {
    this.tags$ = this.watchedTagService.getFavoriteTags();
  }
}
