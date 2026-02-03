import { HttpInterceptorFn } from '@angular/common/http';

const BASE_URL = '/api';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const apiReq = req.clone({
    url: `${BASE_URL}${req.url}`,
  });
  return next(apiReq);
};
