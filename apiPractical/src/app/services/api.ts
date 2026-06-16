
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Post {
  id?: number;
  userId: number;
  title: string;
  body: string;
}

@Injectable({
  providedIn: 'root'
})
export class Api {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {}

  getData(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl);
  }

  postData(data: Post): Observable<Post> {
    return this.http.post<Post>(this.apiUrl, data);
  }

  putData(id: number, data: Post): Observable<Post> {
    return this.http.put<Post>(`${this.apiUrl}/${id}`, data);
  }

  patchData(id: number, data: Partial<Post>): Observable<Post> {
    return this.http.patch<Post>(`${this.apiUrl}/${id}`, data);
  }

  deleteData(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  deleteUsingPost(id: number) {
  return this.http.post(`${this.apiUrl}/delete`, { id });
}

deleteUsingPut(id: number) {
  return this.http.put(`${this.apiUrl}/${id}`, {
    id: id,
    userId: 1,
    title: 'Deleted Post',
    body: '',
    isDeleted: true
  });
}

deleteUsingPatch(id: number) {
  return this.http.patch(`${this.apiUrl}/${id}`, {
    isDeleted: true
  });
}
}