import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  inject,
  Input
} from '@angular/core';
import { Comment } from '@models/comment.model';
import { CommentService } from '@shared/services/comment.service';
import { Observable } from 'rxjs';
import { CommentListItemComponent } from '../comment-list-item/comment-list-item.component';
import { CommentFormComponent } from '../comment-form/comment-form.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-comment-list',
  standalone: true,
  imports: [
    CommentListItemComponent,
    CommentFormComponent,
    MatProgressSpinnerModule,
    MatDividerModule,
    NgIf,
    NgForOf,
    AsyncPipe
  ],
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentListComponent implements OnInit {
  @Input() questionId!: number;

  comments$!: Observable<Comment[]>;

  private commentService = inject(CommentService);

  ngOnInit(): void {
    this.comments$ = this.commentService.getComments(this.questionId!);
  }
}
