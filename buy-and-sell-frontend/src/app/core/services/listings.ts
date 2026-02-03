import { HttpClient, HttpContext, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { BYPASS_AUTH } from '../interceptors/auth-interceptor';
import { BYPASS_CACHING, REFRESH_CACHE } from '../interceptors/caching-interceptor';
import { Listing } from '../models/listing.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class Listings {
  private readonly http = inject(HttpClient);
  private auth = inject(Auth);

  isRefreshCache = false;

  getListings$(): Observable<Listing[]> {
    return this.http
      .get<Listing[]>('/listings', {
        context: new HttpContext().set(BYPASS_AUTH, true).set(REFRESH_CACHE, this.isRefreshCache),
      })
      .pipe(finalize(() => (this.isRefreshCache = false)));
  }

  getListingById$(id: string): Observable<Listing> {
    return this.http.get<Listing>(`/listings/${id}`, {
      context: new HttpContext().set(BYPASS_AUTH, true).set(BYPASS_CACHING, true),
    });
  }

  addViewToListing$(id: string): Observable<Listing> {
    return this.http.post<Listing>(`/listings/${id}/add-view`, {
      ...httpOptions,
      context: new HttpContext().set(BYPASS_AUTH, true),
    });
  }

  getListingsForUser$(): Observable<Listing[]> {
    return new Observable<Listing[]>((observer) => {
      user(this.auth).subscribe((user) => {
        if (!user) observer.next([]);
        this.http
          .get<Listing[]>(`/users/${user!.uid}/listings`, {
            ...httpOptions,
            context: new HttpContext().set(BYPASS_CACHING, true),
          })
          .subscribe((data) => observer.next(data));
      });
    });
  }

  deleteListing$<T>(id: string): Observable<T> {
    return this.http
      .delete<T>(`/listings/${id}`, httpOptions)
      .pipe(finalize(() => (this.isRefreshCache = true)));
  }

  createListing$(name: string, description: string, price: number): Observable<Listing> {
    return this.http
      .post<Listing>('/listings', { name, description, price }, httpOptions)
      .pipe(finalize(() => (this.isRefreshCache = true)));
  }

  editListings$(id: string, name: string, description: string, price: number): Observable<Listing> {
    return this.http
      .post<Listing>(`/listings/${id}`, { name, description, price }, httpOptions)
      .pipe(finalize(() => (this.isRefreshCache = true)));
  }
}
