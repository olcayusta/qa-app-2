import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Tag } from '@models/tag.model';
import { TagListItemComponent } from '../tag-list-item/tag-list-item.component';
import { NgForOf } from '@angular/common';
@Component({
  selector: 'app-tag-list',
  standalone: true,
  imports: [TagListItemComponent, NgForOf],
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagListComponent {
  @Input() tags!: Tag[];
}
