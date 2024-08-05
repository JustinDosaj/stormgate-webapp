// pages/index.tsx
import { Inter } from "next/font/google";
import { Hero } from "@/components/ui/hero";
import BuildList from "@/components/ui/buildlist";
import { GetServerSideProps } from "next";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy, limit, startAt } from "firebase/firestore";
import { Build, BuildListProps } from "@/constants/interfaces";
import { GetAuthor } from "./api/firebase/functions";

// Define your font
const inter = Inter({ subsets: ["latin"] });

const BUILDS_PER_PAGE = 10;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { page = "1" } = context.query;
  const currentPage = parseInt(page as string, 10);

  try {
    // Reference the builds collection and order by ID
    const buildsCollectionRef = collection(db, "builds");

    const buildsQuery = query(
      buildsCollectionRef,
      orderBy("id"),
      limit(BUILDS_PER_PAGE),
      startAt((currentPage - 1) * BUILDS_PER_PAGE)
    );

    const querySnapshot = await getDocs(buildsQuery);

    const buildPromises = querySnapshot.docs.map(async (doc) => {
      
      const data = doc.data();
      const username = await GetAuthor(data.owner.id);

      return {
        id: doc.id,
        slug: data.data.slug || "temp-slug",
        title: data.buildName,
        author: username,
        faction: data.faction,
        enemyFaction: data.enemyFaction,
        rating: data.rating || 0,
        dateCreated: new Date(data.data.createdAt).toLocaleDateString(),
        dateUpdated: new Date(data.data.updatedAt).toLocaleDateString(),
      };
    });

    // Map through the documents and transform data into your Build structure
    const builds: Build[] = await Promise.all(buildPromises);

    // Calculate total number of builds and pages
    const totalBuildsQuery = await getDocs(buildsCollectionRef);
    const totalBuilds = totalBuildsQuery.size;
    const totalPages = Math.ceil(totalBuilds / BUILDS_PER_PAGE);

    return {
      props: {
        builds,
        currentPage,
        totalPages,
      },
    };
  } catch (error) {
    console.error("Error fetching builds:", error);
    return {
      props: {
        builds: [],
        currentPage: 1,
        totalPages: 1,
      },
    };
  }
};

export default function Home({ builds, currentPage, totalPages }: BuildListProps) {
  
  return (
    <main className={`bg-gray-900 flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}>
      <Hero />
      <BuildList builds={builds} title={"Stormgate Build Orders"} currentPage={currentPage} totalPages={totalPages} />
    </main>
  );
}
