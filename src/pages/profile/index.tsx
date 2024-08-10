// profile/index.tsx

import { useEffect } from "react";
import { Inter } from "next/font/google";
import ProfileComponent from "@/components/ui/profile";
import { useAuth } from "@/context/AuthContext"; // Use the Auth Context
import BuildList from "@/components/ui/buildlist";
import { useRouter } from "next/router";
import Head from "next/head";

// Define your font
const inter = Inter({ subsets: ["latin"] });

export default function Profile() {
  const { user, isLoading } = useAuth(); // Access the user and loading state
  const router = useRouter();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isLoading && !user) {
      router.push("/auth/login");
    }
  }, [user, isLoading, router]);

  return (
    <>
    <Head>
      <title>Stormgate Tactics | Your Profile</title>
      <meta name="robots" content="noindex" />
    </Head>
    <main className={`bg-gray-900 flex min-h-screen flex-col items-center justify-between py-24 space-y-24 ${inter.className}`}>
      <ProfileComponent />
      <BuildList title={"Your Build Orders"} userId={user?.uid} className="min-h-screen"/>
    </main>
    </>
  );
}

