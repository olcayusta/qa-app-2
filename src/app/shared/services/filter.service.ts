import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { Question } from '@models/question.model';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  constructor(private http: HttpClient) {}

  getQuestionsByFiltered(sort?: string | null, filter?: string | null): Observable<Question[]> {
    if (sort) {
      const params = {
        sort: sort,
       // filter: filter
      };
      return this.http.get<Question[]>(`${environment.apiUrl}/questions/sort/${filter}`, {
        params
      });
    } else {
      return this.http.get<Question[]>(`${environment.apiUrl}/questions`);
    }
  }
}
