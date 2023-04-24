import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from '@models/question.model';
import { API_URL } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private http = inject(HttpClient);

  getAllQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(`${API_URL}/questions`);
  }

  getActiveQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(`${API_URL}/questions/active`);
  }

  getUnansweredQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(`${API_URL}/questions/unanswered`);
  }

  getQuestion(questionId: string): Observable<Question> {
    return this.http.get<Question>(`${API_URL}/questions/${questionId}`);
  }

  getMoreQuestions(offset: number = 0): Observable<Question[]> {
    return this.http.get<Question[]>(`${API_URL}/questions/loadmore/${offset}`);
  }

  getFeedContent(page: number = 0): Observable<Question[]> {
    const params = new HttpParams()
      .set('per_page', 15)
      .set('page', page)
      .set('sort_by', 'hotness_score')
      .set('sort_direction', 'desc');
    return this.http.get<Question[]>(`${API_URL}/home`, {
      params
    });
  }

  saveQuestion(
    title: string,
    content: string,
    tags: number[]
  ): Observable<Question> {
    return this.http.post<Question>(`${API_URL}/questions`, {
      title,
      content,
      tags
    });
  }
}
