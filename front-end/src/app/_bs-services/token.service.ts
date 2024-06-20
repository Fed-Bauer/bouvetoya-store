import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpErrorResponse, HttpClient
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from "rxjs/operators";
import {UserAuthService} from "./user-auth.service";
import { Router } from '@angular/router';
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private apiUrl = environment.apiUrl;

  constructor(
    private userAuthService: UserAuthService,
    private router: Router,
    private httpClient: HttpClient
  ) { }

  public addTokenToRequest(headers: HttpHeaders): HttpHeaders {
    const token = this.userAuthService.getToken();
    console.log('Token:', token);

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.status === 401) {
      this.router.navigate(['/login']);
    } else if (error.status === 403) {
      this.router.navigate(['/forbidden']);
    }
    return throwError('Упс, что-то пошло не так :)');
  }
  get<T>(url: string): Observable<T> {
    let headers = new HttpHeaders();
    headers = this.addTokenToRequest(headers);
    return this.httpClient.get<T>(`${this.apiUrl}${url}`, { headers }).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  post<T>(url: string, body: any): Observable<T> {
    let headers = new HttpHeaders();
    headers = this.addTokenToRequest(headers);
    return this.httpClient.post<T>(`${this.apiUrl}${url}`, body, {headers}).pipe(
      catchError(this.handleError.bind(this))
    );
  }
  delete<T>(url: string): Observable<T> {
    let headers = new HttpHeaders();
    headers = this.addTokenToRequest(headers);
    return this.httpClient.delete<T>(`${this.apiUrl}${url}`, { headers }).pipe(
      catchError(this.handleError.bind(this))
    );
  }
}
