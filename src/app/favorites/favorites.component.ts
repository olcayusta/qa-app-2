import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FavoriteService } from './favorite.service';
import { Question } from '@models/question.model';
import { Observable } from 'rxjs';
import { AsyncPipe, NgForOf } from '@angular/common';

@Component({
  selector: 'app-favorites',
  standalone: true,
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  imports: [NgForOf, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoritesComponent implements OnInit {
  private favoriteService = inject(FavoriteService);

  questions$!: Observable<Question[]>;

  ngOnInit(): void {
    this.questions$ = this.favoriteService.getFavoriteQuestions();
  }
}
