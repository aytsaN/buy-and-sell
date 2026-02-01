import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from "@angular/router";
import { CommonModule } from '@angular/common';

import { fakeListings } from '../shared/mocks/listings.mock';

@Component({
  selector: 'bs-listing-detail-page',
  imports: [RouterLink, CommonModule],
  templateUrl: './listing-detail-page.html',
  styleUrl: './listing-detail-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListingDetailPage {
  id = input<string>();

  protected listing = computed(() => fakeListings.find(listing => listing.id === this.id()));
}
