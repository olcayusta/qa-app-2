import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { HeroDelayDirective } from '../../directives/hero-delay.directive';
import { Herov2Directive } from '@shared/directives/herov2.directive';

@Component({
  selector: 'app-question-text',
  standalone: true,
  imports: [HeroDelayDirective, Herov2Directive],
  templateUrl: './question-text.component.html',
  styleUrls: ['./question-text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionTextComponent {
  @Input() content!: string;
}
