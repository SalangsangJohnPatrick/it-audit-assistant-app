import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastService } from '../../shared/components/toast/toast.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(ToastService);

  return next(req).pipe(
    catchError((err: unknown) => {
      const msg = err instanceof HttpErrorResponse
        ? (err.error?.error || err.message || `HTTP ${err.status}`)
        : 'Unexpected error';

      toast.error(msg);
      return throwError(() => err); // always rethrow
    })
  );
};
