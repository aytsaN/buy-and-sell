import { ChangeDetectionStrategy, Component, effect, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Listings } from '../core/services/listings';

@Component({
  selector: 'bs-contact-page',
  imports: [FormsModule],
  templateUrl: './contact-page.html',
  styleUrl: './contact-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactPage {
  id = input.required<string>();

  private readonly router = inject(Router);
  private readonly listingService = inject(Listings);

  protected isLoading = signal(true);
  protected email = signal('');
  protected message = signal('');

  constructor() {
    effect((onCleanup) => {
      const currentId = this.id();

      this.isLoading.set(true);

      const subscription = this.listingService.getListingById$(currentId).subscribe({
        next: (listing) => {
          this.message.set(`Hi, I'm interested in your ${listing.name}`);
          this.isLoading.set(false);
        },
        error: () => this.isLoading.set(false),
      });

      onCleanup(() => {
        console.log(`Cleaning up request for ID: ${currentId}`);
        subscription.unsubscribe();
      });
    });
  }

  protected sendMessage() {
    alert(`Message sent`);
    this.router.navigateByUrl('/listings');
  }
}
