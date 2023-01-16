import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-feedback-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    NgIf
  ],
  templateUrl: './feedback-dialog.component.html',
  styleUrls: ['./feedback-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedbackDialogComponent {
  private formBuilder = inject(FormBuilder);

  feedbackForm!: FormGroup;

  formControl = new FormControl(null, {
    validators: [Validators.required],
    updateOn: 'submit'
  });

  constructor() {
    this.feedbackForm = this.formBuilder.group({
      feedbackText: [null, Validators.required]
    }, {
      updateOn: 'submit'
    });
  }

  sendFeedback($event: SubmitEvent) {
    console.log('Form submitted!');
  }
}
