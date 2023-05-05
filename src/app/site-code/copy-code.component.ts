import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { IconComponent } from '@components/icon/icon.component';
import { CodeHighlight } from '@shared/directives/codeHighlight';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'inek-copy-code',
  standalone: true,
  imports: [
    MatButtonModule,
    MatTooltipModule,
    NgIf,
    IconComponent,
    CodeHighlight,
    MatIconModule
  ],
  templateUrl: './copy-code.component.html',
  styleUrls: ['./copy-code.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CopyCodeComponent implements OnInit {
  // htmlPreElement!: HTMLPreElement;
  @Input() htmlPreElement1!: HTMLPreElement;

  language: string = '';
  @Input() HTMLPreText!: HTMLPreElement;
  @Input() helloWorld!: number;

  private snackBar = inject(MatSnackBar);

  async copyCodeToClipboard() {
    await navigator.clipboard.writeText(this.htmlPreElement1.textContent!);
    this.snackBar.open('Kod panoya kopyalandı', 'Action', {
      duration: 500000000
    });
  }

  ngOnInit() {
    // console.log(this.HTMLPreText)
  }
}
