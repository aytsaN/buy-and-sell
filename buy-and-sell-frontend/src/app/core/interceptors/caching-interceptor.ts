import { HttpContextToken, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { of, tap } from 'rxjs';

import { HttpCache } from '../services/http-cache';

export const BYPASS_CACHING = new HttpContextToken(() => false);
export const REFRESH_CACHE = new HttpContextToken(() => false);

export const cachingInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.method !== 'GET' || req.context.get(BYPASS_CACHING)) return next(req);

  const isRefresh = req.context.get(REFRESH_CACHE);

  const cache = inject(HttpCache);
  const cachedResponse = isRefresh ? undefined : cache.get(req.urlWithParams);

  if (cachedResponse) {
    console.log('cachedResponse', cachedResponse);
    return of(cachedResponse);
  }

  return next(req).pipe(
    tap((event) => {
      console.log('event', event);
      console.log('req.urlWithParams', req.urlWithParams);
      if (event instanceof HttpResponse) {
        cache.put(req.urlWithParams, event);
      }
    }),
  );
};
