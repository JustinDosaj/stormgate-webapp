// profile/index.tsx
import { Inter } from "next/font/google";
import BuildList from "@/components/ui/buildlist";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy, limit, startAt } from "firebase/firestore";
import ProfileComponent from "@/components/ui/profile";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { GetServerSideProps } from "next";
import { Build, BuildListProps } from "@/lib/stormgate-units";
import { GetAuthor } from "../api/firebase/functions";

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


export default function Profile({builds, currentPage, totalPages}: BuildListProps) {

    const auth = useRequireAuth();
    
    return (
        <main className={`bg-gray-900 flex min-h-screen flex-col items-center justify-between p-24 space-y-12 ${inter.className}`}>
            <ProfileComponent className="w-1/2"/>
            <BuildList builds={builds} title={"Your Build Orders"} currentPage={currentPage} totalPages={totalPages}/>
        </main>
    );
}
