import { Routes } from '@angular/router';

import { ListingsPage } from './listings-page/listings-page';

export const routes: Routes = [
  { path: 'listings', component: ListingsPage, pathMatch: 'full' },
  {
    path: 'listings/:id',
    loadComponent: () =>
      import('./listing-detail-page/listing-detail-page').then((m) => m.ListingDetailPage),
  },
  {
    path: 'contact/:id',
    loadComponent: () => import('./contact-page/contact-page').then((m) => m.ContactPage),
  },
  {
    path: 'edit-listing/:id',
    loadComponent: () =>
      import('./edit-listing-page/edit-listing-page').then((m) => m.EditListingPage),
  },
  {
    path: 'my-listings',
    loadComponent: () =>
      import('./my-listings-page/my-listings-page').then((m) => m.MyListingsPage),
  },
  {
    path: 'new-listing',
    loadComponent: () =>
      import('./new-listing-page/new-listing-page').then((m) => m.NewListingPage),
  },
  { path: '**', redirectTo: 'listings' },
];
