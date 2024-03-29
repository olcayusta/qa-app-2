import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  AfterViewInit,
  ViewChildren,
  QueryList,
  OnDestroy,
  inject
} from '@angular/core';
import { AnswerService } from '@shared/services/answer.service';
import { Observable, tap } from 'rxjs';
import { Answer } from '@models/answer.model';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe, NgForOf, NgIf, ViewportScroller } from '@angular/common';
import { AnswerItemComponent } from './answer-item/answer-item.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

interface SortItem {
  value: number;
  viewValue: string;
  sortBy: string;
}

@Component({
  selector: 'app-answer-list',
  standalone: true,
  imports: [
    AnswerItemComponent,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    AsyncPipe,
    NgIf,
    NgForOf
  ],
  templateUrl: './answer-list.component.html',
  styleUrls: ['./answer-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnswerListComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input('acceptedAnswerId') acceptedAnswerId: number | null | undefined;
  @Input('questionId') questionId!: number;
  @ViewChildren(AnswerItemComponent) items!: QueryList<AnswerItemComponent>;

  answers$!: Observable<Answer[]>;

  sortItems: SortItem[] = [
    {
      value: 0,
      sortBy: 'DESC',
      viewValue: 'Eklenme tarihi (en yeni)'
    },
    {
      value: 1,
      sortBy: 'ASC',
      viewValue: 'Eklenme tarihi (en eski)'
    },
    {
      value: 2,
      sortBy: 'VOTE',
      viewValue: 'En iyi yorumlar'
    }
  ];

  selectedIndex = 0;

  private route = inject(ActivatedRoute);
  private scroll = inject(ViewportScroller);
  private answerService = inject(AnswerService);

  ngOnInit(): void {
    this.answers$ = this.answerService.getAnswers(this.questionId!).pipe(
      tap((answers) => {
        answers.filter((answer) =>
          answer.id === 26 ? (answer.accepted = true) : null
        );
      })
    );

    // Answer sorting initialize
    this.sortByInitialize();
  }

  sortByInitialize() {
    const sortBy = localStorage.getItem('sortBy');
    if (sortBy) {
      const { value } = JSON.parse(sortBy) as SortItem;
      console.log(value);
      this.selectedIndex = value;
    }

    this.selectedIndex = 1;
  }

  // TODO Subscribe normal sartlarda otomatik kapaniyor ama xhr hatalarinda test edilmedi.
  ngAfterViewInit() {
    const { fragment } = this.route.snapshot;

    if (fragment) {
      const { documentElement } = document;
      // documentElement.style.scrollBehavior = 'smooth';
      this.scroll.setOffset([0, 64]);
      this.items.changes.subscribe((_) => {
        this.scroll.scrollToAnchor(`answer-${fragment}`);
      });
    }
  }

  ngOnDestroy() {
    document.documentElement.style.scrollBehavior = '';
  }

  // score - modified - create
  changeSelectedIndex(index: number) {
    this.selectedIndex = index;
    localStorage.setItem('sortBy', JSON.stringify(this.sortItems[index]));

    const { sortBy } = JSON.parse(localStorage.getItem('sortBy')!) as SortItem;

    const questionId = Number(this.route.snapshot.paramMap.get('questionId'));
    this.answers$ = this.answerService.getAnswersBySort(questionId, sortBy);
  }
}
