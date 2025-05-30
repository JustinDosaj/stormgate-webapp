// pages/index.tsx
import { Inter } from "next/font/google";
import { Hero } from "@/components/ui/hero";
import Head from "next/head";
import BuildList from "@/components/ui/buildlist";
import AdSense from "@/components/ads/adsense";
import { About } from "@/components/ui/about";
import { StickyAd } from "@/components/ads/sticky";
import { GetServerSideProps } from "next";
import { getEntriesForContentTypes } from "@/lib/contentful";
import { ExploreList } from "@/components/ui/explore/explore-list";

// Define your font
const inter = Inter({ subsets: ["latin"] });

export const getServerSideProps: GetServerSideProps = async () => {

  const entries = await getEntriesForContentTypes(['blogPost'])

  const blogContent = entries.blogPost

  return {
    props: { blogContent },
  };
};

export default function Home({blogContent}: any) {
  
  return (
    <>
    <Head>
      <title>Stormgate Tactics | Stormgate Builds, Guides, News & More</title>
      <meta name="title" content="Stormgate Tactics | Stormgate Builds, Guides, News & More"/>
      <meta name="description" content="Learn everything you need to know about Stormgate, the next-gen RTS game - builds, guides, news & more!"/>
      <meta property="og:title" content="Stormgate Tactics | Stormgate Builds, Guides, News & More" />
      <meta property="og:description" content="Learn everything you need to know about Stormgate, the next-gen RTS game - builds, guides, news & more!" />
      <meta property="og:url" content="https://www.stormgatehub.com" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Stormgate Tactics" />
    </Head>
    <main className={`bg-gray-900 flex min-h-screen flex-col items-center justify-between py-24 space-y-12 ${inter.className}`}>
      <div className="w-full flex justify-center">
          <StickyAd adSlot="123456789"/>
          <div className="max-w-5xl flex-grow 2xl:mx-28 space-y-16">
            <Hero />
            <BuildList title={"Build Orders"} />
            <About/>
            <ExploreList blogContent={blogContent}/>
          </div>
          <StickyAd adSlot="123456789"/>
      </div>
    </main>
    </>
  );
}
