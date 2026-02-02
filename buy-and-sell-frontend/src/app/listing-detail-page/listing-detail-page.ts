import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { tap } from 'rxjs';

import { Listings } from '../core/services/listings';

@Component({
  selector: 'bs-listing-detail-page',
  imports: [RouterLink, CommonModule],
  templateUrl: './listing-detail-page.html',
  styleUrl: './listing-detail-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListingDetailPage {
  id = input.required<string>();

  private readonly listingService = inject(Listings);

  protected listingResource = rxResource({
    params: () => ({ id: this.id() }),
    stream: ({ params }) =>
      this.listingService.getListingById$(params.id).pipe(tap(() => this.updateViews(params.id))),
  });

  //TODO: unsubscribe
  private updateViews(id: string) {
    this.listingService.addViewToListing$(id).subscribe({
      next: () => console.log('Views updated'),
      error: (err) => console.error('Failed to update views', err),
    });
  }
}
