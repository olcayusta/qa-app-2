import { inject, Injectable } from '@angular/core';
import { User } from '@models/user.model';
import { Observable } from 'rxjs';
import { API_URL } from '@environments';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private http = inject(HttpClient);

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${API_URL}/users`);
  }
}
