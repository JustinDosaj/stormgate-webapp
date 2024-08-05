// Import necessary Firebase functions
import { GetServerSideProps } from "next";
import { Inter } from "next/font/google";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/shared/button";
import { useRouter } from "next/router";
import { GetAuthor, UpdateLikesInFirebase } from "@/pages/api/firebase/functions";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { BuildViewList } from "@/components/ui/buildview/list";
import { HandThumbUpIcon } from "@heroicons/react/24/solid";
import { Notify } from "@/components/shared/notify";

const inter = Inter({ subsets: ["latin"] });

export const getServerSideProps: GetServerSideProps = async (context) => {
  
  const { query } = context;
  const id = query.id as string;
  const slug = query.slug as string;

  try {
    // Reference the specific build document in Firestore
    const buildDocRef = doc(db, "builds", id);
    const buildDoc = await getDoc(buildDocRef);

    if (!buildDoc.exists()) {
      return {
        notFound: true, // Return a 404 page if build does not exist
      };
    }

    // Fetch build data from Firestore
    const buildData = buildDoc.data();
    const username = await GetAuthor(buildData.owner.id);

    // Remove or transform the non-serializable Firestore reference
    const { owner, ...rest } = buildData;
    const ownerData = {
      ...owner,
      ref: owner.ref.path, // or remove `ref` if not needed
    };

    return {
      props: {
        build: { ...rest, owner: ownerData },
        id,
        slug,
        username,
      },
    };
  } catch (error) {
    console.error("Error fetching build:", error);
    return {
      notFound: true, // Return a 404 page if there's an error
    };
  }
};

// Define the Build component to render the fetched data
const Build: React.FC<{ build: any; id: string; slug: string, username: string }> = ({
  build,
  id,
  slug,
  username,
}) => {

  const router = useRouter();
  const [ isOwner, setIsOwner ] = useState<boolean>(false)
  const { user, isLoading } = useAuth();
  const [likes, setLikes] = useState<number>(build?.data.likes || 0);
  const [hasLiked, setHasLiked] = useState<boolean>(false);

  useEffect(() => {
    
    if(user?.uid === build.owner.id) {
      setIsOwner(true)
    }

    if (build.data.likedBy && user) {
      setHasLiked(build.data.likedBy.includes(user.uid));
    }

  },[user, isLoading, build.data.likedBy])

  const handleLike = async () => {
    
    if (!user) {
      ("You must be logged in to like a build!")
      return;
    }

    if (hasLiked) {
      Notify("You've already liked this build!")
      return;
    }

    try {

      await UpdateLikesInFirebase({likes, id, user})
      setLikes(likes + 1);
      setHasLiked(true);

    } catch (error) {
      console.error("Error liking the build:", error);
    }
  }


  return (
    <main
      className={`bg-gray-900 flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <Container className="p-6 max-w-4xl mx-auto bg-gray-800 text-white rounded-lg shadow-lg">
        {/* General Build Information */}
        <div className="flex items-center justify-between mb-8">
          <div className="inline-flex items-center gap-4">
            <h1 className="text-3xl font-bold">{build.buildName}</h1>
            <div className="flex items-center justify-center">
              <button
                onClick={handleLike}
                className="flex items-center bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full transition-all duration-200 ease-in-out"
              >
                <HandThumbUpIcon className="h-8 w-8 mr-2" />
                {likes} Likes
              </button>
            </div>
          </div>
          {isOwner && (
            <Button
              text="Edit"
              buttonType="button"
              onClick={() => router.push(`/builds/edit/${id}`)}
            />
          )}
        </div>
        <p className="mb-4">{build.summary}</p>
        <div className="flex justify-between mb-4">
          <span>Faction: {build.faction}</span>
          <span>Enemy Faction: {build.enemyFaction}</span>
        </div>
        <div className="flex justify-between mb-4">
          <span>Game Mode: {build.gameMode}</span>
          <span>Created by: {username}</span>
        </div>
        <div className="flex justify-between mb-4">
          <span>
            Created At: {new Date(build.data.createdAt).toLocaleDateString()}
          </span>
          <span>
            Updated At: {new Date(build.data.updatedAt).toLocaleDateString()}
          </span>
        </div>
        <div className="mb-4">
          <a
            href={build.youtubeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 underline"
          >
            Watch on YouTube
          </a>{" "}
          {" | "}
          <a
            href={build.twitchLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 underline"
          >
            Watch on Twitch
          </a>
        </div>
        <div className="mb-8">
          <p className="font-semibold">Additional Information:</p>
          <p>{build.description}</p>
        </div>

        {/* Build Steps */}
        <h2 className="text-2xl font-semibold mb-4">Build Order Steps</h2>

        {/* List Header */}
        <div className="grid grid-cols-4 gap-4 bg-gray-700 p-4 font-semibold text-gray-300 border-b border-gray-400 rounded-t-md">
          <div>Timing</div>
          <div>Unit/Structure/Action</div>
          <div>Description</div>
          <div>Amount</div>
        </div>

        {/* Steps List */}
        <BuildViewList build={build}/>
      
      </Container>
    </main>
  );
};

export default Build;
