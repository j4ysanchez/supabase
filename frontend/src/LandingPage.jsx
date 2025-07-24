import React from 'react';

export default function LandingPage({ user, onSignOut }) {
  return (
    <div>
      <h1>Welcome, {user.email}!</h1>
      <p>You are now logged in.</p>
      <button onClick={onSignOut}>Sign Out</button>
      {/* Add more navigation or content here */}
    </div>
  );
}