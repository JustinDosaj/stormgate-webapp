// pages/login.tsx
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../lib/firebase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Redirect to home or another page after login
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="dark:bg-gray-900 min-h-screen text-white flex items-center justify-center">
      <div className="w-full max-w-xs">
        <h1 className="text-3xl font-bold mb-4">Login</h1>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-2 bg-gray-800 text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 bg-gray-800 text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="w-full bg-blue-500 p-2"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
}
