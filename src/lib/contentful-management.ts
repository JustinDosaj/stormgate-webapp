// lib/contentful-management.ts
import { createClient } from "contentful-management";

export const managementClient = createClient({
  accessToken: "YOUR_MANAGEMENT_ACCESS_TOKEN",
});
