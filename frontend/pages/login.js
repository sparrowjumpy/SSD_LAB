import { useState } from 'react';
import { useRouter } from 'next/router';
import FormInput from '../components/FormInput';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:8000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (res.ok) {
      // Store access and refresh tokens in localStorage
      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);
      // Redirect to feed
      router.push('/feed');
    } else {
      let errorMessage = data.detail || 'Login failed';
      alert(`Login failed: ${errorMessage}`);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6">
      <form className="bg-white p-8 rounded shadow-md w-full max-w-md" onSubmit={handleLogin}>
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        <FormInput label="Username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        <FormInput label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mt-4">
          Login
        </button>
      </form>
    </main>
  );
}
