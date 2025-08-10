import {HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest} from '@angular/common/http';
import {catchError, Observable, throwError, timeout, TimeoutError} from 'rxjs';

export function timeoutInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  return next(req).pipe(
    timeout(5000),
    catchError(err => {
      if (err instanceof TimeoutError) {
        const httpError = new HttpErrorResponse({
          error: 'Timeout de la requête',
          status: 408,
          statusText: 'Request Timeout',
          url: req.url
        });
        return throwError(() => httpError);
      }
      return throwError(() => err);
    })
  )
}

export function roundTo(value: number, decimals: number) {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}
