import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';

import { Listings } from '../core/services/listings';

@Component({
  selector: 'bs-listings-page',
  imports: [CommonModule, RouterLink],
  templateUrl: './listings-page.html',
  styleUrl: './listings-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListingsPage {
  private readonly listingsService = inject(Listings);

  protected listings = toSignal(this.listingsService.getListings$());
}
