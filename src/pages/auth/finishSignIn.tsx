import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import Head from "next/head";
import { Container } from "@/components/shared/container";
import { Loader } from "@/components/shared/loader";

export default function FinishSignIn() {
  
  const { finishSignIn } = useAuth(); // Use finishSignIn from context
  const router = useRouter();

 useEffect(() => {
    finishSignIn().then(() => {
      router.push("/");
    });
  }, [finishSignIn, router]);

  return (
    <>
      <Head>
        <title>Signing In to Stormgate Tactics</title>
        <meta name="robots" content="noindex" />
      </Head>
      <main
        className={`bg-gray-900 flex min-h-screen flex-col items-center py-24 justify-between`}
      >
          <div className="w-full max-w-xs grid justify-center">
            <h1 className="text-3xl font-bold mb-4 text-white text-center">Signing in...</h1>
            <Loader/>
          </div>
      </main>
    </>
  );
}
