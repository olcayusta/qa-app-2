import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';

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
