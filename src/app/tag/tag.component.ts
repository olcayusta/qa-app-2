import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Tag } from '@models/tag.model';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { HomeQuestionListItemComponent } from '@components/home-question-list-item/home-question-list-item.component';

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
  @Input() tag!: Tag;
}
