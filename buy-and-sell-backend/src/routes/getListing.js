import { notFound } from '@hapi/boom';
import { db } from '../database';

export const getListingsRoute = {
  method: 'GET',
  path: '/api/listings/{id}',
  handler: async (req, h) => {
    const id = req.params.id;
    const { results } =  await db.query('SELECT * FROM listings WHERE id=?', [id],);
    const listing = results[0];
    if (!listing) throw notFound(`Listing with id ${id} not found`);
    return listing;
  }
}
