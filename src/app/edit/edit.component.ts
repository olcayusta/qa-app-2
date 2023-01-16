import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { Question } from '@models/question.model';
import { Observable, tap } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RevisionService } from '@shared/services/revision.service';
import { MarkedService } from '@shared/services/marked.service';
import { MatSelectModule } from '@angular/material/select';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [ReactiveFormsModule, MatSelectModule, NgIf, NgForOf, MatInputModule, AsyncPipe],
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditComponent implements OnInit {
  question$!: Observable<Question>;

  editForm!: FormGroup;

  foods: Food[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' }
  ];

  readonly formBuilder = inject(FormBuilder);

  constructor(
    private revisionService: RevisionService,
    private markedService: MarkedService
  ) {
    this.editForm = this.formBuilder.group({
      revisions: [null],
      title: [null, Validators.required],
      text: [null, Validators.required],
      summary: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.question$ = this.revisionService.getQuestion(125).pipe(
      tap(({ title, content, revisions }: Question) => {
        this.editForm.get('title')?.patchValue(title);
        this.editForm.get('text')?.patchValue(content);
        this.editForm.get('revisions')?.patchValue(revisions);

        const formText = this.editForm.get('text')?.value;

        this.markedService.markedWorker.postMessage(formText);
        this.markedService.getMessages().subscribe((value) => {
          console.log(value);
        });
      })
    );
  }
}
