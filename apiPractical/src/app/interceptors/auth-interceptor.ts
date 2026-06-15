import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { Auth } from '../services/auth';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(Auth);
  const router = inject(Router);

  const token = auth.getToken();

  const authReq = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      })
    : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      let message = 'Something went wrong';

      if (error.status === 401) {
        message = 'Unauthorized. Please login again.';
        auth.logout();
        router.navigate(['/login']);
      } else if (error.status === 403) {
        message = 'Access denied.';
      } else if (error.status === 404) {
        message = 'API not found.';
      } else if (error.status === 500) {
        message = 'Server error. Try again later.';
      }

      alert(message);
      return throwError(() => error);
    })
  );
};