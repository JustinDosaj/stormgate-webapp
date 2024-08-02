import { Inter } from "next/font/google";
import BuildList from "@/components/ui/buildlist";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Builds() {
  return (
    <main className={`bg-gray-900 flex min-h-screen flex-col items-center justify-between p-24 ${inter}`}>
        <div className="mx-auto my-auto text-center text-white">
        <div>Explore News Page</div>
            <Link href={{pathname: `/news/post/news-article-1`}}>Go to Articles</Link>
        </div>
    </main>
  );
}
