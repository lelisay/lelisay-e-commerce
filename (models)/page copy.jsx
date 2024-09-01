"use client";

import { useState } from 'react';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password
    });

    if (result.error) {
      setError(result.error);
    } else {
      window.location.href = '/'; // Redirect to home page or dashboard
    }
  };

  return (
    <div className="flex items-center justify-center h-80  bg-background dark:bg-secondary py-8 px-4 pt-32">
      <div className="bg-card dark:bg-slate-900 p-8 rounded-lg shadow-lg w-full max-w-md transform transition-all duration-300 hover:scale-105 overflow-hidden">
        <h1 className="text-3xl font-bold text-foreground text-center mb-6 dark:text-slate-400">
          Sign In
        </h1>
        
        {error && <p className="mb-4 text-destructive animate-pulse">{error}</p>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full px-4 py-2 border border-border rounded-md bg-background dark:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder-muted-foreground transition duration-300 ease-in-out"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full px-4 py-2 border border-border rounded-md bg-background dark:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder-muted-foreground transition duration-300 ease-in-out"
          />
          <button
            type="submit"
            className="w-full py-3 bg-primary text-primary-foreground rounded-md hover:bg-opacity-90 hover:shadow-lg transform hover:-translate-y-1 transition duration-300 ease-in-out"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 flex flex-col space-y-2">
          <button
            onClick={() => signIn('google', { callbackUrl: '/' })}
            className="w-full py-2 bg-red-600 text-white font-bold rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300 ease-in-out"
          >
            Sign in with Google
          </button>
          <button
            onClick={() => signIn('github', { callbackUrl: '/' })}
            className="w-full py-2 bg-gray-800 text-white font-bold rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-300 ease-in-out"
          >
            Sign in with GitHub
          </button>
        </div>
      </div>
    </div>
  );
}
