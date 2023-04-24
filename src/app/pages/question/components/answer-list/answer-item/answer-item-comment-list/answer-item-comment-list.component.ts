import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  inject
} from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '@models/comment.model';
import { CommentService } from '@shared/services/comment.service';
import { CommonModule } from '@angular/common';
import { CommentListItemComponent } from '../../../comment-list-item/comment-list-item.component';

@Component({
  selector: 'app-answer-item-comment-list',
  templateUrl: './answer-item-comment-list.component.html',
  styleUrls: ['./answer-item-comment-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, CommentListItemComponent]
})
export class AnswerItemCommentListComponent implements OnInit {
  @Input() answerId!: number;

  comments$!: Observable<Comment[]>;

  private commentService = inject(CommentService);

  ngOnInit(): void {
    this.comments$ = this.commentService.getAnswerComments(this.answerId);
  }
}
