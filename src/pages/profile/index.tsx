// profile/index.tsx

import { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import BuildList from "@/components/ui/buildlist";
import { db } from "@/lib/firebase";
import { collection, getDocs, doc, getDoc, query, orderBy } from "firebase/firestore";
import ProfileComponent from "@/components/ui/profile";
import { useAuth } from "@/context/AuthContext"; // Use the Auth Context
import { Build } from "@/lib/stormgate-units";
import { GetAuthor } from "../api/firebase/functions";
import { useRouter } from "next/router";

// Define your font
const inter = Inter({ subsets: ["latin"] });

const BUILDS_PER_PAGE = 10;

export default function Profile() {
  const [builds, setBuilds] = useState<Build[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const { user, isLoading } = useAuth(); // Access the user and loading state
  const router = useRouter();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isLoading && !user) {
      router.push("/auth/login");
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (user) {
      const fetchUserBuilds = async () => {
        try {
          // Reference the user's document and their "my-builds" subcollection
          const userDocRef = doc(db, "users", user.uid);
          const myBuildsCollectionRef = collection(userDocRef, "my-builds");

          // Fetch user's build IDs
          const myBuildsQuery = query(myBuildsCollectionRef, orderBy("buildId"));
          const myBuildsSnapshot = await getDocs(myBuildsQuery);

          // Extract build IDs from user's "my-builds" subcollection
          const buildRefs = myBuildsSnapshot.docs.map((doc) => ({
            buildId: doc.data().buildId, // Extract the buildId field
          }));

          // Calculate total number of builds and pages for the user
          const totalBuilds = buildRefs.length;
          const totalPages = Math.ceil(totalBuilds / BUILDS_PER_PAGE);

          // Paginate results based on build IDs
          const paginatedBuildRefs = buildRefs.slice(
            (currentPage - 1) * BUILDS_PER_PAGE,
            currentPage * BUILDS_PER_PAGE
          );

          // Fetch builds from the "builds" collection using build IDs
          const buildPromises = paginatedBuildRefs.map(async (buildRef) => {
            const buildDocRef = doc(db, "builds", buildRef.buildId.toString());
            const buildDoc = await getDoc(buildDocRef);
            const data = buildDoc.data();

            const username = await GetAuthor(data?.owner.id);

            return {
              id: buildDoc.id,
              slug: data?.data.slug || "temp-slug",
              title: data?.buildName,
              author: username,
              faction: data?.faction,
              enemyFaction: data?.enemyFaction,
              rating: data?.rating || 0,
              dateCreated: new Date(data?.data.createdAt).toLocaleDateString(),
              dateUpdated: new Date(data?.data.updatedAt).toLocaleDateString(),
            };
          });

          const builds: Build[] = await Promise.all(buildPromises);

          setBuilds(builds);
          setTotalPages(totalPages);
        } catch (error) {
          console.error("Error fetching user builds:", error);
        }
      };

      fetchUserBuilds();
    }
  }, [user, currentPage]);

  if (isLoading) {
    // Show a loading spinner or a placeholder while loading
    return <div>Loading...</div>;
  }

  return (
    <main
      className={`bg-gray-900 flex min-h-screen flex-col items-center justify-between p-24 space-y-12 ${inter.className}`}
    >
      <ProfileComponent className="w-1/2" />
      <BuildList
        builds={builds}
        title={"Your Build Orders"}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </main>
  );
}

