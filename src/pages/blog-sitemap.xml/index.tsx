// pages/blog-sitemap.xml/index.tsx
import { GetServerSideProps } from 'next';
import { getServerSideSitemapLegacy, ISitemapField } from 'next-sitemap';
import { getEntriesForContentTypes } from '@/lib/contentful';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const entries = await getEntriesForContentTypes(['blogPost']);
  const blogPosts = entries.blogPost;

  const fields: ISitemapField[] = blogPosts.map((post: any) => ({
    loc: `https://www.stormgatetactics.com/explore/post/${post.slug}`, // Adjust the domain as necessary
    lastmod: new Date().toISOString(),
    changefreq: 'weekly',
    priority: 0.8,
  }));

  // Generate sitemap
  return getServerSideSitemapLegacy(ctx, fields);
};

export default function Sitemap() {
  return null; // This page does not render any content
}
