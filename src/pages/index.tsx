// pages/index.tsx
import { Inter } from "next/font/google";
import { Hero } from "@/components/ui/hero";
import BuildList2 from "@/components/ui/buildlist2";
import { BuildListProps } from "@/constants/interfaces";

// Define your font
const inter = Inter({ subsets: ["latin"] });

export default function Home({ builds, currentPage, totalPages }: BuildListProps) {
  
  return (
    <main className={`bg-gray-900 flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}>
      <Hero />
      <BuildList2 title={"Stormgate Build Orders"}/>
    </main>
  );
}
