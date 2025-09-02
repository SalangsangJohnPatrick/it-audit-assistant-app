import { HttpEvent, HttpEventType, HttpInterceptorFn } from '@angular/common/http';
import { signal } from '@angular/core';
import { tap, finalize } from 'rxjs/operators';

const active = signal(0);

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  active.update(n => n + 1);

  return next(req).pipe(
    tap({
      next: (event: HttpEvent<any>) => {
        if (event.type === HttpEventType.Response) {
          active.update(n => Math.max(0, n - 1));
        }
      },
    }),
    finalize(() => {
      active.update(n => Math.max(0, n - 1));
    })
  );
};
