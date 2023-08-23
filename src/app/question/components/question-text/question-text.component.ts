import {Component, ChangeDetectionStrategy, Input, SimpleChanges, inject, Renderer2, OnInit} from '@angular/core';
import { HeroDelayDirective } from '../../directives/hero-delay.directive';
import { Herov2Directive } from '@shared/directives/herov2.directive';
import {NgForOf, NgIf} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";
import {CodeHighlight} from "@shared/directives/codeHighlight";

@Component({
  selector: 'app-question-text',
  standalone: true,
  imports: [HeroDelayDirective, Herov2Directive, NgForOf, NgIf, MatButtonModule, MatIconModule, MatTooltipModule, CodeHighlight],
  templateUrl: './question-text.component.html',
  styleUrls: ['./question-text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionTextComponent implements OnInit {
  @Input() content!: string;

  private renderer = inject(Renderer2);

  divElement: HTMLDivElement = this.renderer.createElement('div');
  htmlCollection: Element[] = [];


  constructor() {

  }

  ngOnInit() {
    this.divElement.innerHTML = this.content;
    this.htmlCollection = Array.from(this.divElement.children);
    console.log(this.htmlCollection)
  }

}
