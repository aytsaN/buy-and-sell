import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { Listing } from '../core/models/listing.model';
import { Listings } from '../core/services/listings';
import { ListingDataForm } from '../listing-data-form/listing-data-form';

@Component({
  selector: 'bs-new-listing-page',
  imports: [ListingDataForm],
  templateUrl: './new-listing-page.html',
  styleUrl: './new-listing-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewListingPage {
  private readonly router = inject(Router);
  private readonly listingService = inject(Listings);

  protected createListing(listing: Listing) {
    const { name, description, price } = listing;

    this.listingService.createListing$(name, description, price ?? 0).subscribe({
      next: () => this.router.navigateByUrl('/my-listings'),
      error: (err) => console.error('Failed to create listing', err),
    });
  }
}
