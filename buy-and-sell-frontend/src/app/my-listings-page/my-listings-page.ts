import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';

import { Listing } from '../core/models/listing.model';
import { Listings } from '../core/services/listings';

@Component({
  selector: 'bs-my-listings-page',
  imports: [CommonModule, RouterLink],
  templateUrl: './my-listings-page.html',
  styleUrl: './my-listings-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyListingsPage {
  private readonly listingService = inject(Listings);
  private readonly destroyRef = inject(DestroyRef);

  protected listings = signal<Listing[]>([]);

  constructor() {
    this.listingService
      .getListingsForUser$()
      .pipe(takeUntilDestroyed())
      .subscribe((data) => this.listings.set(data));
  }

  deleteListing(listingId: string | null) {
    if (!listingId) return;

    this.listingService
      .deleteListing$(listingId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.listings.update((items) => items.filter((i) => i.id !== listingId));
      });
  }
}
