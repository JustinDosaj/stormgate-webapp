// pages/builds/[id]/[slug].tsx
import { GetServerSideProps } from "next";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import Head from "next/head";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Container } from "@/components/shared/container";
import { useAuth } from "@/context/AuthContext";
import { useModal } from "@/context/ModalContext";
import { GetAuthor, UpdateLikesInFirebase } from "@/pages/api/firebase/functions";
import BuildDetails from "@/components/ui/buildview/build-details";
import BuildHeader from "@/components/ui/buildview/build-header";
import { BuildViewList } from "@/components/ui/buildview/list";
import AdSense from "@/components/ads/adsense";
import { StickyAd } from "@/components/ads/sticky";

const inter = Inter({ subsets: ["latin"] });

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query, req, resolvedUrl } = context;
  const id = query.id as string;
  const slug = query.slug as string;

  try {
    const buildDocRef = doc(db, "builds", id);
    const buildDoc = await getDoc(buildDocRef);

    if (!buildDoc.exists()) {
      return { notFound: true };
    }

    const buildData = buildDoc.data();
    const username = await GetAuthor(buildData.owner.id);

    const { owner, ...rest } = buildData;
    const ownerData = { ...owner, ref: owner.ref.path };

    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const host = req.headers.host;
    const ogUrl = `${protocol}://${host}${resolvedUrl}`;

    return {
      props: {
        build: { ...rest, owner: ownerData },
        id,
        slug,
        username,
        ogUrl,
      },
    };
  } catch (error) {
    console.error("Error fetching build:", error);
    return { notFound: true };
  }
};

const Build: React.FC<{ build: any; id: string; slug: string; username: string; ogUrl: string }> = ({
  build,
  id,
  slug,
  username,
  ogUrl,
}) => {
  const { user, isLoading } = useAuth();
  const { openModal } = useModal();
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [likes, setLikes] = useState<number>(build?.data.likes || 0);
  const [hasLiked, setHasLiked] = useState<boolean>(false);

  useEffect(() => {
    if (user?.uid === build.owner.id) setIsOwner(true);
    if (build.data.likedBy && user) setHasLiked(build.data.likedBy.includes(user.uid));
  }, [user, isLoading, build.data.likedBy]);

  const handleLike = async () => {
    if (!user) {
      openModal(
        "Must Be Logged In",
        "Please login or create an account to like this build.",
        "Login/Signup",
        "auth",
        false,
        build.id,
        slug
      );
      return;
    }

    if (hasLiked) {
      setLikes(likes - 1);
      setHasLiked(false);
      await UpdateLikesInFirebase({ likes, buildId: id, remove: true });
      return;
    }

    try {
      setLikes(likes + 1);
      setHasLiked(true);
      await UpdateLikesInFirebase({ likes, buildId: id });
    } catch (error) {
      console.error("Error liking the build:", error);
    }
  };

  const handleReport = () => {
    if (!user) {
      openModal(
        "Must Be Logged In",
        "Please login or create an account to report this build.",
        "Login/Signup",
        "auth",
        false,
        build.id,
        slug
      );
      return;
    }
    openModal(
      "Report Build",
      "Are you sure you want to report this build?",
      "Report",
      "report",
      false,
      build.id,
      slug,
      user.uid
    );
  };

  const {
    buildName,
    description,
    faction,
    enemyFaction,
    gameMode,
    data,
    steps,
    youtubeLink,
    twitchLink,
    info,
  } = build;

  const formattedSteps = steps
    .map((step: any) => {
      return `${step.id.charAt(0).toUpperCase() + step.id.slice(1)}: Build ${
        step.action.value
      } at ${step.timing.value} ${
        step.timing.type == "time" ? "minutes" : step.timing.type
      }`;
    })
    .join("\n");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: `${buildName}`,
    description: `${description}`,
    text: `${formattedSteps}`,
    datePublished: `${data.createdAt}`,
    interactionStatistic: {
      "@type": "InteractionCounter",
      interactionType: "https://schema.org/LikeAction",
      userInteractionCount: `${likes || 0}`
    },
    author: {
      "@type": "Person",
      name: `${username}`,
    },
  };

  return (
    <>
      <Head>
        <title>{`Stormgate Tactics | ${buildName}`}</title>
        <meta
          name="title"
          content={`Stormgate Tactics | ${buildName}`}
        />
        <meta
          name="description"
          content={`${
            description !== ""
              ? description
              : `Stormgate build order for ${faction} versus ${enemyFaction}`
          }`}
        />
        <meta property="og:title" content={`Stormgate Tactics | ${buildName}`} />
        <meta
          property="og:description"
          content={`${
            description !== ""
              ? description
              : `Stormgate build order for ${faction} versus ${enemyFaction}`
          }`}
        />
        <meta property="og:url" content={ogUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Stormgate Tactics" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <main
        className={`bg-gray-900 flex min-h-screen flex-col items-center justify-between py-24 ${inter.className}`}
      >
        <div className="w-full flex justify-center">
          <StickyAd adSlot="123456789" />
          <div className="max-w-5xl flex-grow 2xl:mx-28">
            <Container className="max-w-4xl mx-auto bg-gray-900 text-white rounded-lg shadow-lg">
              <BuildHeader
                buildName={buildName}
                isOwner={isOwner}
                id={id}
                slug={slug}
                likes={likes}
                hasLiked={hasLiked}
                handleLike={handleLike}
                handleReport={handleReport}
                openModal={openModal}
              />
              <BuildDetails
                description={description}
                faction={faction}
                enemyFaction={enemyFaction}
                gameMode={gameMode}
                username={username}
                createdAt={new Date(data.createdAt).toLocaleDateString()}
                updatedAt={new Date(data.updatedAt).toLocaleDateString()}
                youtubeLink={youtubeLink}
                twitchLink={twitchLink}
                info={info}
              />
              <BuildViewList build={build} />
            </Container>
          </div>
          <StickyAd adSlot="123456789" />
        </div>
        <AdSense
          adSlot="7423668524"
          adFormat="auto"
          className="max-w-5xl"
          adStyle={{ width: "100%", height: "300px" }}
        />
      </main>
    </>
  );
};

export default Build;

