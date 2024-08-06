// pages/login.tsx
import { useState } from 'react';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';
import { Container } from '@/components/shared/container';
import Head from 'next/head';

export default function Login() {

  const { user, login, logout } = useAuth()  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleEmailLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/'); // Redirect to home or another page after login
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <>
      <Head>
        <title>Stormgate Tactics | Login / Signup</title>
        <meta name="robots" content="noindex" />
      </Head>
      <main className={`bg-gray-900 flex min-h-screen flex-col items-center justify-between`}>
        <Container className="text-white flex items-center justify-center my-auto">
          <div className="w-full max-w-xs">
            <h1 className="text-3xl font-bold mb-4">Login</h1>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 mb-2 bg-gray-800 text-white rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 mb-4 bg-gray-800 text-white rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="w-full bg-blue-500 hover:bg-blue-600 p-2 mb-2 rounded"
              onClick={handleEmailLogin}
            >
              Login with Email
            </button>
            <button
              className="w-full bg-red-500 hover:bg-red-600 p-2 rounded flex items-center justify-center"
              onClick={login}
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
        </Container>
      </main>
    </>
  );
}
