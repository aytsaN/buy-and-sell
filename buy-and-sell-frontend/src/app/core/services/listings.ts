import { HttpClient, HttpContext, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { BYPASS_AUTH } from '../interceptors/auth-interceptor';
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

  getListings$(): Observable<Listing[]> {
    return this.http.get<Listing[]>('/api/listings', {
      context: new HttpContext().set(BYPASS_AUTH, true),
    });
  }

  getListingById$(id: string): Observable<Listing> {
    return this.http.get<Listing>(`/api/listings/${id}`, {
      context: new HttpContext().set(BYPASS_AUTH, true),
    });
  }

  addViewToListing$(id: string): Observable<Listing> {
    return this.http.post<Listing>(
      `/api/listings/${id}/add-view`,
      {
        context: new HttpContext().set(BYPASS_AUTH, true),
      },
      httpOptions,
    );
  }

  getListingsForUser$(): Observable<Listing[]> {
    return new Observable<Listing[]>((observer) => {
      user(this.auth).subscribe((user) => {
        if (!user) observer.next([]);
        this.http
          .get<Listing[]>(`/api/users/${user!.uid}/listings`, httpOptions)
          .subscribe((data) => observer.next(data));
      });
    });
  }

  deleteListing$<T>(id: string): Observable<T> {
    return this.http.delete<T>(`/api/listings/${id}`, httpOptions);
  }

  createListing$(name: string, description: string, price: number): Observable<Listing> {
    return this.http.post<Listing>('/api/listings', { name, description, price }, httpOptions);
  }

  editListings$(id: string, name: string, description: string, price: number): Observable<Listing> {
    return this.http.post<Listing>(
      `/api/listings/${id}`,
      { name, description, price },
      httpOptions,
    );
  }
}
