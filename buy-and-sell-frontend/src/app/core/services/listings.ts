import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { Listing } from '../models/listing.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class Listings {
  private readonly http = inject(HttpClient);

  getListings$(): Observable<Listing[]> {
    return this.http.get<Listing[]>('/api/listings');
  }

  getListingById$(id: string): Observable<Listing> {
    return this.http.get<Listing>(`/api/listings/${id}`);
  }

  addViewToListing$(id: string): Observable<Listing> {
    return this.http.post<Listing>(`/api/listings/${id}/add-view`, {}, httpOptions);
  }

  //TODO: remove hardcode
  getListingsForUser$(): Observable<Listing[]> {
    return this.http.get<Listing[]>('/api/users/12345/listings');
  }

  deleteListing$<T>(id: string): Observable<T> {
    return this.http.delete<T>(`/api/listings/${id}`);
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
