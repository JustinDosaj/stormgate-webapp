// pages/index.tsx
import { Inter } from "next/font/google";
import { Hero } from "@/components/ui/hero";
import Head from "next/head";
import BuildList from "@/components/ui/buildlist";

// Define your font
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  
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
    <main className={`bg-gray-900 flex min-h-screen flex-col items-center justify-between p-24 space-y-12 ${inter.className}`}>
      <Hero />
      <BuildList title={"Stormgate Build Orders"}/>
    </main>
    </>
  );
}
