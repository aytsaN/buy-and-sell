import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Listing } from '../core/models/listing.model';

@Component({
  selector: 'bs-listing-data-form',
  imports: [FormsModule],
  templateUrl: './listing-data-form.html',
  styleUrl: './listing-data-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListingDataForm implements OnInit {
  buttonText = input.required<string>();
  currentName = input<string>('');
  currentDescription = input<string>('');
  currentPrice = input<number | null>(null);

  submitListing = output<Listing>();

  private readonly router = inject(Router);

  protected name = signal('');
  protected description = signal('');
  protected price = signal<number | null>(null);

  ngOnInit() {
    this.name.set(this.currentName());
    this.description.set(this.currentDescription());
    this.price.set(this.currentPrice());
  }

  protected submitting() {
    this.submitListing.emit({
      id: null,
      name: this.name(),
      description: this.description(),
      price: Number(this.price()),
      views: 0,
    });
  }
}
