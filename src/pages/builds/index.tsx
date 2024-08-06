import { Inter } from "next/font/google";
import BuildList from "@/components/ui/buildlist";

const inter = Inter({ subsets: ["latin"] });

export default function Builds() {
  return (
    <main className={`bg-gray-900 flex min-h-screen flex-col items-center justify-between p-24 ${inter}`}>
      <BuildList title={"Stormgate Build Orders"}/>
    </main>
  );
}
