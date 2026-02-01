import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Listing } from '../core/models/listing.model';
import { fakeListings } from '../shared/mocks/listings.mock';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'bs-listings-page',
  imports: [CommonModule, RouterLink],
  templateUrl: './listings-page.html',
  styleUrl: './listings-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListingsPage implements OnInit {
  protected listings = signal<Listing[]>([]);

  ngOnInit() {
    this.listings.set(fakeListings);
  }
}
