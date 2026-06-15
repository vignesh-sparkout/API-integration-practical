import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  username: string;
  email: string;
}
interface RegisterUser {
  username: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private apiUrl = 'https://dummyjson.com/auth/login';

  constructor(private http: HttpClient) {}

  login(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiUrl, data);
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

register(user: RegisterUser): void {
  localStorage.setItem('registeredUser', JSON.stringify(user));
}

getRegisteredUser(): RegisterUser | null {
  const user = localStorage.getItem('registeredUser');
  return user ? JSON.parse(user) : null;
}

isRegisteredUser(username: string, password: string): boolean {
  const user = this.getRegisteredUser();

  return !!user &&
    user.username === username &&
    user.password === password;
}

}