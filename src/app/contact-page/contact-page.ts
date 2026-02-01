import { ChangeDetectionStrategy, Component, computed, input, inject, signal, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { fakeListings } from '../shared/mocks/listings.mock';

@Component({
  selector: 'bs-contact-page',
  imports: [FormsModule],
  templateUrl: './contact-page.html',
  styleUrl: './contact-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactPage implements OnInit {
  id = input<string>();

  private readonly router = inject(Router);

  protected listing = computed(() => fakeListings.find(listing => listing.id === this.id()));
  protected email = signal('');
  protected message = signal('');

  ngOnInit() {
    this.message.set(`Hi, I am interested in your ${this.listing()?.name.toLocaleLowerCase()}!`);
  }

  protected sendMessage() {
    alert(`Message sent`);
    this.router.navigateByUrl('/listings');
  }
}
