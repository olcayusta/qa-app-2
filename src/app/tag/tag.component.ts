import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Tag } from '@models/tag.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { HomeQuestionListItemComponent } from '@components/home-question-list-item/home-question-list-item.component';
import { getResolvedData } from '../core/router.utils';

@Component({
  selector: 'app-tag',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    MatDividerModule,
    NgForOf,
    HomeQuestionListItemComponent
  ],
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagComponent {
  tag$: Observable<Tag> = getResolvedData().pipe(map(({ tag }) => tag));
}
