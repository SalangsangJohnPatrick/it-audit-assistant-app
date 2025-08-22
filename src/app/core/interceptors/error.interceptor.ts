import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastService } from '../../shared/components/toast/toast.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(ToastService);
  return next(req).pipe({
    error: (err: unknown) => {
      const msg = err instanceof HttpErrorResponse
        ? (err.error?.error || err.message || `HTTP ${err.status}`)
        : 'Unexpected error';
      toast.error(msg);
      throw err;
    }
  } as any);
};
