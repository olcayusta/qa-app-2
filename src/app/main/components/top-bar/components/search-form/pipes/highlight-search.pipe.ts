import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlightSearch',
  standalone: true
})
export class HighlightSearchPipe implements PipeTransform {
  transform(value: string, args: string): unknown {
    if (!args) {
      return value;
    } else {
      const re = new RegExp(args, 'gi');
      return value.replace(re, `<mark>$&</mark>`);
    }
  }
}
