import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { NgIf } from '@angular/common';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { IconComponent } from '@components/icon/icon.component';
import { IsiklandirDirective } from '@shared/directives/isiklandir.directive';

@Component({
  selector: 'app-site-code',
  standalone: true,
  imports: [MatButtonModule, MatTooltipModule, NgIf, IconComponent, IsiklandirDirective],
  templateUrl: './site-code.component.html',
  styleUrls: ['./site-code.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SiteCodeComponent implements OnInit {
  text!: HTMLPreElement;
  language: string = '';
  @Input() HTMLPreText!: HTMLPreElement;
  @Input() helloWorld!: number;

  constructor(private snackBar: MatSnackBar) {
  }

  async copyCodeToClipboard() {
    await navigator.clipboard.writeText(this.text.textContent!);
    this.snackBar.open('Kod panoya kopyalandı');
  }

  ngOnInit() {
    // console.log(this.HTMLPreText)
  }
}
