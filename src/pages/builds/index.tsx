import { Inter } from "next/font/google";
import { StickyAd } from "@/components/ads/sticky";
import BuildList from "@/components/ui/buildlist";
import Head from "next/head";
import AdSense from "@/components/ads/adsense";

const inter = Inter({ subsets: ["latin"] });

export default function Builds() {
  return (
    <>
      <Head>
        <title>Stormgate Tactics | Top Rated Builds & Guides</title>
        <meta name="title" content="Stormgate Tactics | Top Rated Builds & Guides"/>
        <meta name="description" content="Find top-rated, trending and new build guides designed for new & experienced Stormgate players"/>
        <meta property="og:title" content="Stormgate Tactics | Top Rated Builds & Guides" />
        <meta property="og:description" content="Find top-rated, trending and new build orders designed for new & experienced Stormgate players RTS" />
        <meta property="og:url" content="https://www.stormgatehub.com/builds" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Stormgate Tactics" />
      </Head>
      <main className={`bg-gray-900 flex min-h-screen flex-col items-center justify-between py-24 space-y-12 ${inter}`}>
        <div className="w-full flex justify-center">
          <StickyAd adSlot="123456789"/>
          <div className="max-w-5xl flex-grow 2xl:mx-28">
            <BuildList title={"Stormgate Build Orders"}/>
          </div>
          <StickyAd adSlot="123456789"/>
        </div>
        <AdSense 
            adSlot="7423668524" 
            adFormat="auto"
            className="max-w-5xl"
            adStyle={{ width: '100%', height: '300px' }}
          />
      </main>
    </>
  );
}
