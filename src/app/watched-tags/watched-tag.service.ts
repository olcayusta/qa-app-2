import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tag } from '@models/tag.model';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WatchedTagService {
  private http = inject(HttpClient);

  getFavoriteTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(`${environment.apiUrl}/watched-tags`);
  }
}
