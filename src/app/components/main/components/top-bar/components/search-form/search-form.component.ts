import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs/operators';
import { ISearchResult, SearchService } from '@shared/services/search.service';
import {
  MatLegacyAutocompleteModule as MatAutocompleteModule,
  MatLegacyAutocompleteSelectedEvent as MatAutocompleteSelectedEvent,
  MatLegacyAutocompleteTrigger as MatAutocompleteTrigger
} from '@angular/material/legacy-autocomplete';
import { Router, RouterLink } from '@angular/router';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { HighlightSearchPipe } from './pipes/highlight-search.pipe';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { IconComponent } from '@components/icon/icon.component';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyDialog as MatDialog, MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';


@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    HighlightSearchPipe,
    MatButtonModule,
    MatAutocompleteModule,
    MatTooltipModule,
    AsyncPipe,
    NgForOf,
    NgIf,
    RouterLink,
    IconComponent,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchFormComponent implements OnInit {
  searchControl: FormControl<string> = new FormControl<string>('', { initialValueIsDefault: true });
  filteredResults$!: Observable<ISearchResult>;

  @ViewChild('autocompleteTrigger', { read: MatAutocompleteTrigger })
  autoComplete!: MatAutocompleteTrigger;

  constructor(private searchService: SearchService, private router: Router, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.filteredResults$ = this.searchControl.valueChanges.pipe(
      filter((value) => value.length > 0),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((searchTerm: string) => this.searchService.searchQuestion(searchTerm))
    );
  }

  /*  displayFn(question: Question): string {
    return question && question ? question.title : null;
  }*/

  displayFn(value: any): string {
    return value ? value.title || value.displayName : null;
  }

  async selectedOption($event: MatAutocompleteSelectedEvent): Promise<void> {
    if ($event.option.group.label === 'Sorular') {
      await this.router.navigateByUrl(`/question/${$event.option.value.id}`);
    }

    if ($event.option.group.label === 'Kullanıcılar') {
      await this.router.navigateByUrl(`/user/${$event.option.value.id}`);
    }

    if ($event.option.group.label === 'Etiketler') {
      await this.router.navigateByUrl(`/tag/${$event.option.value.id}`);
    }
  }

  closeAutocomplete() {
    this.autoComplete.closePanel();
  }

  openTestDialog() {

  }

  searchWithAudio() {
    //@ts-ignore
    const SpeechRecognition = window.speechRecognition || window.webkitSpeechRecognition;

    //@ts-ignore
    const recognition = new SpeechRecognition();

    recognition.onstart = () => {
      console.log('voice is activated!');
    };

    recognition.onresult = (e: any) => {
      console.log(e);
      const current = e.resultIndex;
      const transcript = e.results[current][0].transcript;
      console.log(transcript);
    };

    setTimeout(() => {
      recognition.start();
    }, 1000);
  }

  async formSubmit($event: SubmitEvent) {
    $event.preventDefault();
    this.closeAutocomplete();
    await this.router.navigate(['search'], {
      queryParams: {
        q: this.searchControl.value
      }
    });
  }
}
