import { inject, Injectable } from '@angular/core';
import { User } from '@models/user.model';
import { Question } from '@models/question.model';
import { Answer } from '@models/answer.model';
import { Observable } from 'rxjs';
import { API_URL } from '@environments';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);

  getUser(userId: string): Observable<User> {
    return this.http.get<User>(`${API_URL}/users/${userId}`);
  }

  getUserQuestions(userId: number): Observable<Question[]> {
    return this.http.get<Question[]>(`${API_URL}/users/${userId}/questions`);
  }

  getUserAnswers(userId: number): Observable<Answer[]> {
    return this.http.get<Answer[]>(`${API_URL}/users/${userId}/answers`);
  }
}
