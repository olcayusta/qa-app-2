import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { Tag } from '@models/tag.model';
import { ActivatedRoute } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TagsService } from './tags.service';
import { filter, switchMap } from 'rxjs/operators';
import { MatInputModule } from '@angular/material/input';
import { TagListComponent } from './components/tag-list/tag-list.component';

@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, TagListComponent],
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagsComponent implements OnInit {
  tags!: Tag[];

  searchControl = new FormControl<string>('');

  private activatedRoute = inject(ActivatedRoute);
  private tagsService = inject(TagsService);

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        filter((value) => value?.length! > 0),
        switchMap((searchTerm) => this.tagsService.getAllTagsBySearchTerm(searchTerm!))
      )
      .subscribe((tags) => {
        console.log(tags);
      });
  }
}
