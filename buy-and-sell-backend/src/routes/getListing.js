import { Boom, notFound } from "@hapi/boom";
import { fakeListings } from "./fake-data";

export const getListingsRoute = {
  method: 'GET',
  path: '/api/listings/{id}',
  handler: (req, h) => {
    const id = req.params.id;
    const listing = fakeListings.find(listing => listing.id === id);
    if (!listing) throw notFound(`Listing with id ${id} not found`);
    return listing;
  }
}