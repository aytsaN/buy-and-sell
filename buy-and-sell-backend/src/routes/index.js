import { getAllListingsRoute } from './getAllListings';
import { getListingsRoute } from './getListing';
import { addViewListingRoute } from './addViewToListing';
import { getUserListingsRoute } from './getUserListings';
import { createNewListingRoute } from './createNewListing';
import { updatedListingRoute } from './updateListing';
import { deleteListingRoute } from './deleteListing';

export default [
  addViewListingRoute,
  createNewListingRoute,
  deleteListingRoute,
  getAllListingsRoute,
  getListingsRoute,
  getUserListingsRoute,
  updatedListingRoute
];
