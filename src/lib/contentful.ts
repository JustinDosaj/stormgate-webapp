// lib/contentful.ts
import { createClient } from "contentful";

export const contentfulClient = createClient({
  space: "YOUR_SPACE_ID",
  accessToken: "YOUR_ACCESS_TOKEN",
});
