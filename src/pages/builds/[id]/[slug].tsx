// Import necessary Firebase functions
import { GetServerSideProps } from "next";
import { Inter } from "next/font/google";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Container } from "@/components/shared/container";

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
const Build: React.FC<{ build: any; id: string; slug: string }> = ({
  build,
  id,
  slug,
}) => {
  return (
    <main
      className={`bg-gray-900 flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <Container className="p-6 max-w-4xl mx-auto bg-gray-800 text-white rounded-lg shadow-lg">
        {/* General Build Information */}
        <h1 className="text-3xl font-bold mb-4">{build.buildName}</h1>
        <p className="mb-4">{build.summary}</p>
        <div className="flex justify-between mb-4">
          <span>Faction: {build.faction}</span>
          <span>Enemy Faction: {build.enemyFaction}</span>
        </div>
        <div className="flex justify-between mb-4">
          <span>Game Mode: {build.gameMode}</span>
          <span>Created by: {build.owner.username}</span>
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
          <div>Action</div>
          <div>Amount</div>
          <div>Description</div>
        </div>

        {/* Steps List */}
        <div className="bg-gray-800 rounded-b-md">
          {build.steps.map((step: any, index: number) => (
            <div
              key={step.id}
              className="grid grid-cols-4 gap-4 items-center p-4 border-b border-gray-700"
            >
              {/* Timing */}
              <div className="flex items-center space-x-2">
                <span className="font-mono">{step.timing.value}</span>
                <span className="text-xs text-gray-400">{step.timing.type}</span>
              </div>

              {/* Action */}
              <div className="flex-grow">
                {step.action.value ? (
                  <span className="font-medium">{step.action.value}</span>
                ) : (
                  <span className="text-gray-400 italic">No action specified</span>
                )}
              </div>

              {/* Amount */}
              <div className="text-center">
                <span className="font-bold">{step.amount}</span>
              </div>

              {/* Description */}
              <div className="text-sm text-gray-400">
                {step.description || "No description provided"}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </main>
  );
};

export default Build;
