// lib/algolia.ts
import algoliasearch, { SearchIndex } from 'algoliasearch/lite';

const ALGOLIA_APP_ID = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID;
const ALGOLIA_SEARCH_KEY = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_KEY;
const ALGOLIA_INDEX_NAME = `${process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME}`;

const searchClient = algoliasearch(ALGOLIA_APP_ID!, ALGOLIA_SEARCH_KEY!);
export const index: SearchIndex = searchClient.initIndex(ALGOLIA_INDEX_NAME);
