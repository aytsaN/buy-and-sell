import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { ListingDataForm } from "../listing-data-form/listing-data-form";

@Component({
  selector: 'bs-new-listing-page',
  imports: [ListingDataForm],
  templateUrl: './new-listing-page.html',
  styleUrl: './new-listing-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewListingPage {
  private readonly router = inject(Router);

  protected createListing() {
    alert(`Creating a new listing...`);
    this.router.navigateByUrl('/my-listings');
  }
}
