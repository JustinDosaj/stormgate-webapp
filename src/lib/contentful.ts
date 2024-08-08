// lib/contentful.ts
import { createClient } from "contentful";

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID as string,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
});

export const fetchEntries = async (contentType: string) => {
  const entries = await client.getEntries({
    content_type: contentType,
  });
  if (entries.items) {
    return entries.items;
  }
  console.log(`Error getting Entries for ${contentType}.`);
};

export default client