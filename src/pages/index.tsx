// pages/index.tsx
import { Inter } from "next/font/google";
import { Hero } from "@/components/ui/hero";
import BuildList from "@/components/ui/buildlist";

// Define your font
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  
  return (
    <main className={`bg-gray-900 flex min-h-screen flex-col items-center justify-between p-24 space-y-12 ${inter.className}`}>
      <Hero />
      <BuildList title={"Stormgate Build Orders"}/>
    </main>
  );
}
