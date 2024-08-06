// pages/server-sitemap.xml/index.tsx
import { GetServerSideProps } from 'next';
import { getServerSideSitemapLegacy, ISitemapField } from 'next-sitemap';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    // Fetch recipes from Firestore
    const buildsRef = collection(db, 'builds');
    const buildSnapshot = await getDocs(buildsRef);

    const fields: ISitemapField[] = buildSnapshot.docs.map(doc => {
        const item = doc.data();

        return {
            loc: `https://www.stormgatetactics.com/builds/${doc.id}/${item.data.slug}`, // Access slug directly if it's a root property
            lastmod: new Date().toISOString(),
            changefreq: 'weekly',
            priority: 0.9,
        };

    });

    // Generate sitemap
    return getServerSideSitemapLegacy(ctx, fields);
};

export default function Sitemap() {
    return null; // This page does not render any content
}
