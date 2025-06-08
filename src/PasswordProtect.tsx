import React, { useState, ReactNode } from 'react';

interface PasswordProtectProps {
  children: ReactNode;
  correctPassword?: string; // Optional, defaults to 'fluxbeam724'
}



function PasswordProtect({ children, correctPassword = 'fluxbeam724' }: PasswordProtectProps) {
  const [enteredPassword, setEnteredPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (enteredPassword === correctPassword) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white border border-neutral-bg rounded-xl shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary-accent">Access Restricted</h1>
          <p className="mt-2 text-gray-600">This page is password protected.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={enteredPassword}
              onChange={(e) => setEnteredPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-accent focus:border-primary-accent sm:text-sm"
              placeholder="Enter password"
            />
          </div>
          {error && (
            <p className="text-sm text-red-600 text-center">{error}</p>
          )}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-accent hover:bg-primary-accent/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-accent transition-colors"
            >
              Unlock Access
            </button>
          </div>
        </form>
        <p className="mt-4 text-xs text-gray-500 text-center">
          Hint: The password is <span className="font-mono">fluxbeam724</span>
        </p>
      </div>
    </div>
  );
}

export default PasswordProtect;
