import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/elements/navbar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <div className="dark:bg-gray-900 min-h-screen">
        <Navbar/>
        <Component {...pageProps} />
      </div>
    </AuthProvider>

  )
}
