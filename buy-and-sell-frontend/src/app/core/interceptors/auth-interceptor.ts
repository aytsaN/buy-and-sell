import { HttpContextToken, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import { from, switchMap, take } from 'rxjs';

export const BYPASS_AUTH = new HttpContextToken(() => false);

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(Auth);

  if (req.context.get(BYPASS_AUTH)) return next(req);

  return user(auth).pipe(
    take(1),
    switchMap((currentUser) => {
      if (!currentUser) return next(req);

      return from(currentUser.getIdToken()).pipe(
        switchMap((token) => {
          if (!token) return next(req);

          const authReq = req.clone({
            setHeaders: {
              AuthToken: token,
            },
          });
          return next(authReq);
        }),
      );
    }),
  );
};
