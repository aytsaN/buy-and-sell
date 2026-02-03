import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface CacheEntry<T = any> {
  response: HttpResponse<T>;
  expiry: number;
}

@Injectable({
  providedIn: 'root',
})
export class HttpCache {
  private cache = new Map<string, CacheEntry>();

  put<T>(url: string, response: HttpResponse<T>, ttl = 300000) {
    this.cache.set(url, {
      response,
      expiry: Date.now() + ttl,
    });
  }

  get<T>(url: string): HttpResponse<T> | undefined {
    const entry = this.cache.get(url);

    if (!entry) return undefined;

    if (Date.now() > entry.expiry) {
      this.cache.delete(url);
      return undefined;
    }

    return entry.response;
  }
}
