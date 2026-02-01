/**
 * Model representing a listing in the buy-and-sell application.
 */
export interface Listing {
  id: string | null;
  name: string;
  description: string;
  price: number | null;
  views?: number;
}
