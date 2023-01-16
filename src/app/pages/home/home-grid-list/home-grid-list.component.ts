import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Question } from '@models/question.model';
import { BehaviorSubject, first, Observable, Subscription, take } from 'rxjs';
import { FilterService } from '@shared/services/filter.service';
import { ActivatedRoute } from '@angular/router';
import { delay, switchMap } from 'rxjs/operators';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { IsVisibleDirective } from '../directives/is-visible.directive';
import { QuestionService } from '../../question/question.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgForOf, NgIf } from '@angular/common';
import { HomeQuestionListItemComponent } from '@components/home-question-list-item/home-question-list-item.component';

@Component({
  selector: 'app-home-grid-list',
  standalone: true,
  imports: [MatProgressSpinnerModule, HomeQuestionListItemComponent, IsVisibleDirective, NgForOf, NgIf],
  templateUrl: './home-grid-list.component.html',
  styleUrls: ['./home-grid-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('pageAnimations', [
      transition(':enter', [
        query('.hero', [
          style({ opacity: 0, transform: 'translateY(-100px)' }),
          stagger(100, [animate('400ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'none' }))])
        ])
      ])
    ])
  ]
})
export class HomeGridListComponent implements OnInit, OnDestroy {
  questions!: Question[];

  // Number of questions to load as you scroll down the page
  offset = 12;

  // Active page number
  pageNumber = 1;

  // subscription to the route params
  recentQuestionsSubscription!: Subscription;

  // subscription to the load more questions
  loadMoreSubscription!: Subscription;

  // Spinner to show when loading more questions
  loader = false;

  // Spinner hide load questions finished
  dataFinished = false;

  constructor(
    private questionService: QuestionService,
    private filterService: FilterService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.recentQuestionsSubscription = this.route.queryParamMap
      .pipe(
        switchMap((paramMap) => {
          return this.filterService.getQuestionsByFiltered(paramMap.get('sort'), paramMap.get('filter'));
        })
      )
      .subscribe((questions) => {
        this.questions = questions;
        this.cdr.markForCheck();
      });
  }

  ngOnDestroy(): void {
    /**
     * Subscription if not unsubscribed, will cause memory leak,
     * so we unsubscribe here
     */
    !this.recentQuestionsSubscription.closed && this.recentQuestionsSubscription.unsubscribe();

    /**
     * Same as above
     * It's a little different as it will be created if there is a subscription scroll
     */
    if (this.loadMoreSubscription?.closed === false) {
      this.loadMoreSubscription.unsubscribe();
    }
  }

  /**
   * Load more questions is called when the user scrolls down the page
   */
  loadMoreQuestions(): void {
    this.loader = true;
    this.recentQuestionsSubscription = this.questionService
      .getMoreQuestions(this.offset)
      .pipe(delay(400))
      .subscribe((questions) => {
        this.loader = false;
        if (questions.length) {
          this.questions = [...this.questions, ...questions];
          this.offset += 12;
        } else {
          this.dataFinished = true;
        }
        this.cdr.markForCheck();
      });

    this.questionService.getFeedContent(this.pageNumber).subscribe((value) => {
      this.pageNumber += 1;
    });
  }
}
