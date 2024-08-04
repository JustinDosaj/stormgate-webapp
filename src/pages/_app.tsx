import "@/styles/globals.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import type { AppProps } from "next/app";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/elements/navbar";

const customToastStyle = {
  backgroundColor: '#1f2937', // Tailwind's bg-gray-800
  color: '#ffffff', // White text
  borderRadius: '0.375rem', // Rounded-md (6px)
  border: '1px solid #4b5563', // Tailwind's border-gray-600
  padding: '1rem', // Comfortable padding
  fontSize: '0.875rem', // Text-sm
  lineHeight: '1.25rem', // Leading-5
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <div className="dark:bg-gray-900 min-h-screen">
        <Navbar/>
        <Component {...pageProps} />
        <ToastContainer
          toastStyle={customToastStyle}
          position="top-right" // Customize position if needed
          autoClose={5000} // Automatically close after 5 seconds
          hideProgressBar={false} // Show or hide progress bar
          newestOnTop={true} // Newest toasts appear on top
          closeOnClick={true} // Close toast on click
          pauseOnHover={true} // Pause timer on hover
          draggable={true} // Enable drag to close
          theme="dark" // Apply dark theme
        />
      </div>
    </AuthProvider>

  )
}
