import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import { Inter } from "next/font/google";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function Login() {

  const { login, sendSignInLink } = useAuth();
  const [email, setEmail] = useState("");
  const router = useRouter();

  const [error, setError] = useState<string | null>(null); // Add error state
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const { redirect } = router.query;

  const handlePasswordlessLogin = async () => {


    setIsLoading(true);
    setError(null);

    try {
      await sendSignInLink(email, redirect as string);
    } catch (error) {
      console.error("Error sending passwordless link:", error);
      setError("Failed to send sign-in link. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Stormgate Tactics | Login / Signup</title>
        <meta name="robots" content="noindex" />
      </Head>
      <main className={`bg-gray-900 flex min-h-screen flex-col items-center py-24 sm:px-6 lg:px-8 ${inter}`}>
        <div className="sm:max-w-md w-full space-y-8 p-4 lg:p-0">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold text-white">
              Login / Sign Up
            </h2>
          </div>
          <div className="bg-gray-800 py-8 px-4 shadow rounded-lg sm:px-10">
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-white"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="stormgatetactics@gmail.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>


              {error && (
                <div className="text-red-500 text-sm mt-2">{error}</div>
              )}
              <div>
                <button
                  type="button"
                  onClick={handlePasswordlessLogin}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {isLoading ? "Loading..." : "Sign In with Passwordless Email"}
                </button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-300 rounded-md text-gray-800">
                    Or continue with
                  </span>
                </div>
              </div>
              <div>
                <button
                  type="button"
                  onClick={login}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <svg
                    className="h-5 w-5 mr-2"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fab"
                    data-icon="google"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 488 512"
                  >
                    <path
                      fill="currentColor"
                      d="M488 261.8c0 141.2-97.2 240.2-240.1 240.2-47.9 0-91.4-14-128.3-37.9l66-66.5c19.9 13.4 45.4 21.5 72.3 21.5 62.4 0 115.7-40.8 134.5-97.6H244.3V261.8h243.7zm0-40H244.3v-86h-65.6v86h-86v65.6h86v86h65.6v-86h185.2c-1.5 16.4-6.5 32.4-15.2 46.7l66.5 65.9C462 310.2 488 287.8 488 261.8z"
                    ></path>
                  </svg>
                  Sign in with Google
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
