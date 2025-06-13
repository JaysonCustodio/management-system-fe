import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, BehaviorSubject, Observable } from 'rxjs';
import { LoginPayload, RegisterPayload, RegisterLoginResponse } from '@/types/auth.types';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  private currentUserSubject = new BehaviorSubject<any>(null);
  private apiUrl = environment.apiBaseUrl;

  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  currentUser$ = this.currentUserSubject.asObservable();


  constructor() {
    this.isLoggedInSubject.next(this.hasToken());
    const user = localStorage.getItem('current_user');
    if (user) {
      this.currentUserSubject.next(JSON.parse(user));
    }
  }

  private hasToken() {
    return !!localStorage.getItem('access_token');
  }

  isLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }

  register(data: RegisterPayload): Observable<RegisterLoginResponse> {
    return this.http.post<RegisterLoginResponse>(`${this.apiUrl}/auth/register`, data).pipe(
      tap(res => {
        localStorage.setItem('access_token', res.access_token);
        localStorage.setItem('current_user', JSON.stringify(res.user));
        this.isLoggedInSubject.next(true);
        this.currentUserSubject.next(res.user);
      })
    );
  }

  login(data: LoginPayload): Observable<RegisterLoginResponse> {
    return this.http.post<RegisterLoginResponse>(`${this.apiUrl}/auth/login`, data).pipe(
      tap(res => {
        localStorage.setItem('access_token', res.access_token);
        localStorage.setItem('current_user', JSON.stringify(res.user));
        this.isLoggedInSubject.next(true);
        this.currentUserSubject.next(res.user);
      })
    );
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('current_user');
    this.isLoggedInSubject.next(false);
    this.currentUserSubject.next(null);
  }
}
