import { useState } from 'react';
import { useRouter } from 'next/router';
import FormInput from '../components/FormInput';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail]   = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:8000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    });

    const data = await res.json();
    if (res.ok) {
      // Registration successful
      router.push('/login');
    } else {
      // Registration failed, show the returned errors
      // data might look like: { "username": ["A user with that username already exists."] }
      let errorMessage = 'Unknown error';
      if (data.username) errorMessage = data.username.join(' ');
      if (data.email) errorMessage = data.email.join(' ');
      if (data.password) errorMessage = data.password.join(' ');
      alert(`Registration failed: ${errorMessage}`);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6">
      <form className="bg-white p-8 rounded shadow-md w-full max-w-md" onSubmit={handleRegister}>
        <h2 className="text-2xl font-bold mb-6">Register</h2>
        <FormInput label="Username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        <FormInput label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <FormInput label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full mt-4">
          Register
        </button>
      </form>
    </main>
  );
}
