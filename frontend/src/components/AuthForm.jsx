import React, { useState } from 'react';
import { signUp, signIn } from '../auth';

export default function AuthForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const fn = isLogin ? signIn : signUp;
    const { error } = await fn(email, password);
    if (error) setError(error.message);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => {
          setEmail(e.target.value);
          setError('');
        }}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => {
          setPassword(e.target.value);
          setError('');
        }}
        required
      />
      <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
      <button type="button" onClick={() => { setIsLogin(!isLogin); setError(''); }}>
        {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}