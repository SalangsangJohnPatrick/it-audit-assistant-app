import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export const apiBaseInterceptor: HttpInterceptorFn = (req, next) => {
  const isAbsolute = /^https?:\/\//i.test(req.url);

  const apiReq = isAbsolute
    ? req
    : req.clone({ url: `${environment.apiBaseUrl}${req.url}` });

  return next(apiReq);
};
