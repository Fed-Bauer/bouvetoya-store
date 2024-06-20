import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { UserAuthService } from '../_bs-services/user-auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private userAuthService: UserAuthService, private router:Router) {}

    intercept(
      req: HttpRequest<any>,
      next: HttpHandler
    ): Observable<HttpEvent<any>> {
      console.log('Intercepting request:', req);

      if (req.headers.get('No-Auth') === 'True') {
        return next.handle(req.clone());
      }

      const token = this.userAuthService.getToken();
      console.log('Token:', token); // Логирование токена

      if(token) {
        req = this.addToken(req, token);
      }
      console.log('Modified Request:', req);

      return next.handle(req).pipe(
          catchError(
              (err:HttpErrorResponse) => {
                  console.log(err.status);
                  if(err.status === 401) {
                      this.router.navigate(['/login']);
                  } else if(err.status === 403) {
                      this.router.navigate(['/forbidden']);
                  }
                  return throwError("Упс, что-то пошло не так :)");
              }
          )
      );
    }


    private addToken(request:HttpRequest<any>, token:string): HttpRequest<any> {
      console.log('Before addToken');

      const clonedRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Cloned Request Headers:', clonedRequest.headers); // Логирование заголовков клонированного запроса
      return clonedRequest;
    }
  }
