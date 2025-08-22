import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export const apiBaseInterceptor: HttpInterceptorFn = (req, next) => {
  // Already using absolute /api paths; keep for future flexibility
  if (req.url.startsWith('/')) {
    return next(req);
  }
  const cloned = req.clone({ url: `${environment.apiBaseUrl}${req.url}` });
  return next(cloned);
};
