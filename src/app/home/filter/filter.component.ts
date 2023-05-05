import { ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';
import { FilterByComponent } from '../filter-by/filter-by.component';
import { SortByComponent } from '../sort-by/sort-by.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [MatListModule, FilterByComponent, SortByComponent, NgIf],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterComponent implements OnInit {
  filterOpened = false;

  @ViewChild('bottomExample') template!: TemplateRef<any>;

  constructor(private bottomSheet: MatBottomSheet) {
  }

  ngOnInit() {
  }

  /**
   * Mobile => Open Bottom Sheet Component
   */
  openBottomSheet(): void {
    console.log(this.template);
    this.bottomSheet.open(this.template);
  }
}
