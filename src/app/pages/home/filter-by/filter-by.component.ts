import { MatLegacyMenu as MatMenu, MatLegacyMenuItem as MatMenuItem, MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatLegacyCheckboxChange as MatCheckboxChange } from '@angular/material/legacy-checkbox';
import { Router } from '@angular/router';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-filter-by',
  standalone: true,
  imports: [MatMenuModule, NgForOf],
  templateUrl: './filter-by.component.html',
  styleUrls: ['./filter-by.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterByComponent implements OnInit {
  @ViewChild('filterMenu') filterMenu!: MatMenu;

  items = [
    {
      filter: 'a',
      label: 'Cevapsız',
      checked: false
    },
    {
      filter: 'b',
      label: 'Doğru cevapsız',
      checked: false
    },
    {
      filter: 'c',
      label: 'Ödül var',
      checked: false
    }
  ];

  selectedItemIndex = 0;

  // any
  checkedLength: any;

  constructor(public cdr: ChangeDetectorRef, private router: Router) {
  }

  ngOnInit(): void {
  }

  onLanguageMenuItemClicked(menuItem: MatMenuItem, index: number): void {
    this.filterMenu._allItems.toArray().forEach((value) => {
      value._highlighted = false;
    });
    menuItem._highlighted = true;
  }

  checkboxClicked($event: MouseEvent, index: number) {
    $event.stopPropagation();
    this.selectedItemIndex = index;

    const arrayOfValues = ['a', 'b', 'c', 'd'];

    const js = JSON.stringify(arrayOfValues);
    console.log(js);
    console.log(JSON.parse(js));

    this.router.navigate(['/'], {
      queryParams: {
        filter: ['a', 'b', 'c']
      },
      queryParamsHandling: 'merge'
    });
  }

  checkboxChange($event: MatCheckboxChange, index: number) {
    console.log($event.checked);
    this.items[index].checked = $event.checked;

    this.checkedLength = this.items.filter((value) => {
      return value.checked;
    }).length;
  }
}
