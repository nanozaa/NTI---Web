import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (request, next) => next(request).pipe(
  catchError((error: HttpErrorResponse) => {
    const message = error.error?.message || 'The kitchen is temporarily offline. Please try again.';
    return throwError(() => new Error(message));
  }),
);
