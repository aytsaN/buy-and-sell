import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

import { Listing } from '../core/models/listing.model';
import { Listings } from '../core/services/listings';
import { ListingDataForm } from '../listing-data-form/listing-data-form';

@Component({
  selector: 'bs-edit-listing-page',
  imports: [ListingDataForm],
  templateUrl: './edit-listing-page.html',
  styleUrl: './edit-listing-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditListingPage {
  id = input.required<string>();

  private readonly router = inject(Router);
  private readonly listingService = inject(Listings);

  protected listingResource = rxResource({
    params: () => ({ id: this.id() }),
    stream: ({ params }) => this.listingService.getListingById$(params.id),
  });

  editListing(listing: Listing) {
    const { name, description, price } = listing;

    this.listingService.editListings$(this.id(), name, description, price ?? 0).subscribe({
      next: () => this.router.navigateByUrl('/my-listings'),
      error: (err) => console.error('Failed to update listing', err),
    });
  }
}
