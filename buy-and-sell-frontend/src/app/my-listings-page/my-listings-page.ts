import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";

import { fakeMyListings } from '../shared/mocks/listings.mock';

@Component({
  selector: 'bs-my-listings-page',
  imports: [CommonModule, RouterLink],
  templateUrl: './my-listings-page.html',
  styleUrl: './my-listings-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyListingsPage {
  protected listings = signal(fakeMyListings);

  deleteListing(listingId: string | null) {
    alert(`Deleting your listing with id ${listingId}`);
  }
}
