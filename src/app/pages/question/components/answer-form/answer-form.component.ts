import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AnswerService } from '@shared/services/answer.service';
import { MarkedService } from '@shared/services/marked.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { EditorButtonsComponent } from './editor-buttons/editor-buttons.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-answer-form',
  standalone: true,
  imports: [ReactiveFormsModule, EditorButtonsComponent, MatButtonModule, MatInputModule, MatIconModule, AsyncPipe, NgIf, MatTooltipModule],
  templateUrl: './answer-form.component.html',
  styleUrls: ['./answer-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnswerFormComponent implements OnInit, OnDestroy {
  answerControl = new FormControl('Dua lipa is a beautiful singer!', {
    validators: [Validators.required, Validators.minLength(24)],
    initialValueIsDefault: true
  });

  @ViewChild('textAreaElement')
  textAreaElement!: ElementRef<HTMLTextAreaElement>;

  markedText$ = this.markedService.getMessages();

  counter = 0;

  prevStart = 0;
  prevEnd = 0;

  _valueBeforeTemp = '**';
  _valueAfterTemp = '**';
  _selectionStartTemp = 0;
  _selectionEndTemp = 0;
  _tempPatchValue = '';

  valueMap: {
    [key: string]: [string, string];
  } = {
    bold: ['**', '**'],
    italic: ['*', '*'],
    strike: ['~', '~'],
    h1: ['# ', ''],
    h2: ['## ', ''],
    h3: ['### ', ''],
    quote: ['> ', ''],
    ol: ['1. ', ''],
    ul: ['- ', ''],
    inlineCode: ['`', '`'],
    blockCode: ['```\n', '\n```'],
    link: ['[', ']()'],
    check: ['- [x] ', ''],
    image: ['![alt text](image.jpg)', ''],
    hr: ['---\n', ''],
    table: ['| Header | Title |\n| ----------- | ----------- |\n| Paragraph | Text |\n', ''],
    title: ['# ', '']
  };

  constructor(
    private route: ActivatedRoute,
    private answerService: AnswerService,
    private markedService: MarkedService
  ) {
  }

  ngOnInit(): void {
    if (!this.markedService.isAlive) {
      this.markedService.createWorker();
    }

    this.answerControl.valueChanges.subscribe((value) => {
      this.markedService.markedWorker.postMessage(value);
    });

    this.markedService.markedWorker.onmessage = (messageEvent) => {
      console.log(messageEvent.data);
    };
  }

  formSubmit(): void {
    const questionId = Number(this.route.snapshot.paramMap.get('questionId'));
    this.answerService.create(questionId, this.answerControl.value).subscribe((value) => {
      console.log(value);
    });
  }

  getSelection(): string {
    if (window.getSelection()?.toString()) {
      return window.getSelection()?.toString()!;
    } else {
      const { selectionStart, selectionEnd } = this.textAreaElement.nativeElement;
      return this.textAreaElement.nativeElement.value.substring(selectionStart, selectionEnd);
    }
  }

  replaceSelection(text: string) {
    // const trimmedText = `\n${valueAfter}${myField.value.substring(ss, se).trim()}${valueBefore}`;
    const { nativeElement } = this.textAreaElement;
    const { value, selectionStart, selectionEnd } = nativeElement;
    this.answerControl.patchValue(
      value.substring(0, selectionStart) + text + value.substring(selectionEnd, value.length)
    );

    // Focus
    // nativeElement.selectionStart = selectionStart;
    // nativeElement.selectionEnd = selectionEnd + valueBefore.length + valueAfter.length;

    // nativeElement.selectionStart = selectionStart;
    // nativeElement.focus();
  }

  setSelection(start: number, end: number) {
    const { nativeElement } = this.textAreaElement;
    nativeElement.selectionStart = start;
    nativeElement.selectionEnd = end;
    nativeElement.focus();
  }

  formatApply(token: string) {
    const [valueBefore, valueAfter] = this.valueMap[token];

    const { nativeElement } = this.textAreaElement;
    const { selectionStart, selectionEnd } = nativeElement;

    const selectionText = this.getSelection();

    if (selectionText.startsWith(valueBefore) && selectionText.endsWith(valueAfter)) {
      let text;

      if (valueAfter.length === 0) {
        text = selectionText.slice(valueBefore.length);
      } else {
        text = selectionText.slice(valueBefore.length, -valueAfter.length);
      }

      this.replaceSelection(text);
      this.setSelection(selectionStart, selectionEnd - (valueBefore.length + valueAfter.length));
    } else {
      const selectedText = this.getSelection();
      this.replaceSelection(valueBefore + selectedText + valueAfter);

      this.setSelection(selectionStart, selectionEnd + (valueBefore.length + valueAfter.length));

      // nativeElement.selectionStart = selectionStart;
      // nativeElement.selectionEnd = selectionEnd + valueAfter.length;

      // calismayan versiyon
      /*        this._selectionStartTemp = myField.selectionStart;
        this._selectionEndTemp = myField.selectionEnd;
        this._valueBeforeTemp = valueBefore;
        this._valueAfterTemp = valueAfter;
        this.answerControl.patchValue(
          myField.value.substring(0, ss) +
            vb +
            '' +
            va +
            myField.value.substring(se, myField.value.length)
        );
        myField.selectionStart = ss + vb.length;
        myField.selectionEnd = se + vb.length + 0;

        myField.focus();*/

      // Deneysel
      /*  if (myField.value.substring(ss, se)) {
        this.answerControl.patchValue(
          myField.value.substring(0, ss) +
            vb +
            myField.value.substring(ss, se) +
            va +
            myField.value.substring(se, myField.value.length)
        );
        myField.selectionStart = ss;
        myField.selectionEnd = se + vb.length + va.length;
        myField.focus();
      } else {
        // token bos bir alana yeni olarak eklendiyse ve kullanici bir islem yapmadiysa iptal et...
        this.counter++;
        if (this.counter > 1 && myField.value.substring(ss, se).length === 0) {
          console.log('oki toki!');
          alert(selectionText.slice(valueBefore.length));
        }

        // alert(myField.value.substring(ss, se).length);
        let patchedValubeBefore = '';
        this.answerControl.patchValue(
          myField.value.substring(0, ss) +
            vb +
            patchedValubeBefore +
            va +
            myField.value.substring(se, myField.value.length)
        );
        myField.selectionStart = ss + vb.length;
        myField.selectionEnd = se + (vb.length + patchedValubeBefore.length);
        myField.focus();
      }*/
    }

    if (document.getSelection()?.toString()) {
      // console.log('var');
    }
  }

  ngOnDestroy() {
    this.markedService.destroyWorker();
  }
}
