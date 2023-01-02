import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommentService } from '@shared/services/comment.service';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';

@Component({
  selector: 'app-comment-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, MatInputModule],
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentFormComponent implements OnInit {
  commentControl: FormControl = new FormControl('');

  private commentService = inject(CommentService);

  ngOnInit(): void {
  }

  saveComment() {
    this.commentService.addComment(this.commentControl.value, 121).subscribe((comment) => {
      alert('Yorum kaydedildi!');
    });
  }
}
