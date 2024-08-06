import { Inter } from "next/font/google";
import BuildList from "@/components/ui/buildlist";
import Head from "next/head";

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
      <main className={`bg-gray-900 flex min-h-screen flex-col items-center justify-between p-24 ${inter}`}>
        <BuildList title={"Stormgate Build Orders"}/>
      </main>
    </>
  );
}
