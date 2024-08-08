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

interface ContentfulEntryFields {
  [key: string]: any;
}

export const getEntriesForContentTypes = async (contentTypes: string[], limit?: number ): Promise<{ [key: string]: ContentfulEntryFields[] }> => {
  const entries: { [key: string]: ContentfulEntryFields[] } = {};

  for (const contentType of contentTypes) {
    const res = await client.getEntries({ 
      content_type: contentType,
      limit,
    });

    entries[contentType] = res.items.map(item => ({
      id: item.sys.id,
      dateCreated: item.sys.createdAt,
      dateUpdated: item.sys.updatedAt,
      ...item.fields
    }));
  }

  return entries;
};

export const getBlogPostBySlug = async (slug: string) => {
  const entries = await client.getEntries({
    content_type: 'blogPost',
    'fields.slug': slug,
  });

  if (entries.items.length > 0) {
    return entries.items[0];
  }

  return null;
};

export default client