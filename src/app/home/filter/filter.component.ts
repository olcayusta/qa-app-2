import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { FilterByComponent } from '../filter-by/filter-by.component';
import { SortByComponent } from '../sort-by/sort-by.component';
import { NgIf } from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {MatChipsModule} from "@angular/material/chips";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [MatListModule, FilterByComponent, SortByComponent, NgIf, MatButtonModule, MatChipsModule, MatIconModule],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterComponent implements OnInit {
  filterOpened = false;

  constructor() {
  }

  ngOnInit() {
  }
}
