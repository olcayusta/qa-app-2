import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Question } from '@models/question.model';
import { Tag } from '@models/tag.model';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { RelativeTimeFormatPipe } from '@shared/pipes/relative-time-format.pipe';
import { NgForOf, NgIf, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ImgShadowComponent } from '@shared/components/img-shadow/img-shadow.component';

@Component({
  selector: 'app-home-question-list-item',
  standalone: true,
  imports: [MatChipsModule, MatDividerModule, ImgShadowComponent, RelativeTimeFormatPipe, NgIf, NgForOf, RouterLink, NgOptimizedImage],
  templateUrl: './home-question-list-item.component.html',
  styleUrls: ['./home-question-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeQuestionListItemComponent implements OnInit {
  @Input() question!: Question;

  ngOnInit(): void {
    const tags: Tag[] = JSON.parse(localStorage.getItem('watchedTags') as string);
    if (tags) {
      this.question?.tags?.forEach((tag) => {
        tags.forEach((watchedTag) => {
          if (tag.id === watchedTag.id) tag.selected = true;
        });
      });
    }
  }
}
