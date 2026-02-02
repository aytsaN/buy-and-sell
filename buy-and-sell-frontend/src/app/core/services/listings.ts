import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import { Observable } from 'rxjs';

import { Listing } from '../models/listing.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

const httpOptionsWithAuthToken = (token: string) => ({
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    AuthToken: token,
  }),
});

@Injectable({
  providedIn: 'root',
})
export class Listings {
  private readonly http = inject(HttpClient);
  private auth = inject(Auth);

  getListings$(): Observable<Listing[]> {
    return this.http.get<Listing[]>('/api/listings');
  }

  getListingById$(id: string): Observable<Listing> {
    return this.http.get<Listing>(`/api/listings/${id}`);
  }

  addViewToListing$(id: string): Observable<Listing> {
    return this.http.post<Listing>(`/api/listings/${id}/add-view`, {}, httpOptions);
  }

  getListingsForUser$(): Observable<Listing[]> {
    return new Observable<Listing[]>((observer) => {
      user(this.auth).subscribe((user) => {
        if (!user) observer.next([]);

        user!.getIdToken().then((token) => {
          if (!token) observer.next([]);

          this.http
            .get<Listing[]>(`/api/users/${user!.uid}/listings`, httpOptionsWithAuthToken(token))
            .subscribe((data) => observer.next(data));
        });
      });
    });
  }

  deleteListing$<T>(id: string): Observable<T> {
    return new Observable<T>((observer) => {
      user(this.auth).subscribe((user) => {
        if (!user) observer.next({} as T);

        user!.getIdToken().then((token) => {
          if (!token) observer.next({} as T);

          this.http
            .delete<T>(`/api/listings/${id}`, httpOptionsWithAuthToken(token))
            .subscribe((data) => observer.next(data));
        });
      });
    });
  }

  createListing$(name: string, description: string, price: number): Observable<Listing> {
    return new Observable<Listing>((observer) => {
      user(this.auth).subscribe((user) => {
        if (!user) observer.next({} as Listing);

        user!.getIdToken().then((token) => {
          if (!token) observer.next({} as Listing);

          this.http
            .post<Listing>(
              '/api/listings',
              { name, description, price },
              httpOptionsWithAuthToken(token),
            )
            .subscribe((data) => observer.next(data));
        });
      });
    });
  }

  editListings$(id: string, name: string, description: string, price: number): Observable<Listing> {
    return new Observable<Listing>((observer) => {
      user(this.auth).subscribe((user) => {
        if (!user) observer.next({} as Listing);

        user!.getIdToken().then((token) => {
          if (!token) observer.next({} as Listing);

          this.http
            .post<Listing>(
              `/api/listings/${id}`,
              { name, description, price },
              httpOptionsWithAuthToken(token),
            )
            .subscribe((data) => observer.next(data));
        });
      });
    });
  }
}
