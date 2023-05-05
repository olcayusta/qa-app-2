import { AfterViewInit, Directive, ElementRef, inject } from '@angular/core';
import hljs from 'highlight.js/lib/core';

import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import php from 'highlight.js/lib/languages/php';
import python from 'highlight.js/lib/languages/python';
import sql from 'highlight.js/lib/languages/sql';
import css from 'highlight.js/lib/languages/css';
import json from 'highlight.js/lib/languages/json';
import bash from 'highlight.js/lib/languages/bash';
import xml from 'highlight.js/lib/languages/xml';

hljs.registerLanguage('js', javascript);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('css', css);
hljs.registerLanguage('php', php);
hljs.registerLanguage('sql', sql);
hljs.registerLanguage('python', python);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('json', json);
hljs.registerLanguage('xml', xml);

hljs.configure({
  languages: [
    'xml',
    'javascript',
    'typescript',
    'sql',
    'xml',
    'css',
    'php',
    'python',
    'bash',
    'json'
  ],
  ignoreUnescapedHTML: true
});

@Directive({
  selector: '[codeHighlight]',
  standalone: true
})
export class CodeHighlight implements AfterViewInit {
  preElement: HTMLPreElement = inject(ElementRef).nativeElement;

  async ngAfterViewInit() {
    const codeElement = this.preElement.querySelector('code') as HTMLElement;

    codeElement && hljs.highlightElement(codeElement);
  }
}
