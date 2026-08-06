import { defineLive } from 'next-sanity/live';
import { client } from './sanity.client';

const token = process.env.SANITY_API_READ_TOKEN;

export const { sanityFetch, SanityLive } = defineLive({
  client: client.withConfig({ apiVersion: 'v2024-08-01' }),
  serverToken: token,
  browserToken: token,
});
