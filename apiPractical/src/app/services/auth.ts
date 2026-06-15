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

  getCurrentUser() {
  return this.http.get('https://dummyjson.com/auth/me');
}

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');

  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser')
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

register(user: RegisterUser): void {
  const users = this.getRegisteredUser();
  users.push(user);
  localStorage.setItem('registeredUser', JSON.stringify(users));
}

getRegisteredUser(): RegisterUser [] {
  const user = localStorage.getItem('registeredUser');
  if (!user){
    return[]
  }
  const parsedUser =JSON.parse(user)
  return Array.isArray(parsedUser) ? parsedUser : [parsedUser]
}

isRegisteredUser(username: string, password: string): boolean {
  const users = this.getRegisteredUser();

  return users.some(user =>
    user.username === username &&
    user.password === password
  )
   
}
saveCurrentUser(username:string):void{
  localStorage.setItem('currentUser', username);
}
getCurrentUserName():string | null {
  return localStorage.getItem('currentUser')
}

}
