import { ChangeDetectionStrategy, Component, inject, input, computed } from '@angular/core';
import { Router } from '@angular/router';

import { ListingDataForm } from '../listing-data-form/listing-data-form';
import { fakeMyListings } from '../shared/mocks/listings.mock';

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

  protected listing = computed(() => fakeMyListings.find(listing => listing.id === this.id()));

  editListing() {
    alert(`Saving changes to the listing`);
    this.router.navigateByUrl('/my-listings');
  }
}
