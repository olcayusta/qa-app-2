import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Question } from '@models/question.model';
import { Observable } from 'rxjs';
import { API_URL } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private http = inject(HttpClient);

  addToFavorite(questionId: number): Observable<Question> {
    return this.http.post<Question>(`${API_URL}/bookmarks`, {
      questionId
    });
  }

  getFavoriteQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(`${API_URL}/me/bookmarks`);
  }
}
