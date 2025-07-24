import React, { useEffect, useState } from 'react';
import AuthForm from './components/AuthForm';
import { supabase, getUser, signOut } from './auth';
import LandingPage from './LandingPage';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check for an existing session on mount
    getUser().then(({ data }) => {
      if (data && data.user) setUser(data.user);
    });

    // Listen for auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    await signOut();
    setUser(null);
  };

  return (
    <div className="App">
      {user ? (
        <LandingPage user={user} onSignOut={handleSignOut} />
      ) : (
        <AuthForm />
      )}
    </div>
  );
}

export default App;
