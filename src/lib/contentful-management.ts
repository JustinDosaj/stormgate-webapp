// lib/contentful-management.ts
import { createClient } from "contentful-management";

export const managementClient = createClient({
  accessToken: `${process.env.NEXT_PUBLIC_CONTENTFUL_MANAGEMENT_ACCESS_TOKEN}`,
});
