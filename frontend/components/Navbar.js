import { useRouter } from 'next/router';

export default function Navbar() {
  const router = useRouter();

  async function handleLogout() {
    await fetch('http://localhost:8000/api/auth/logout', { method: 'POST', credentials: 'include' });
    router.push('/login');
  }

  return (
    <nav className="bg-white border-b border-gray-300 px-4 py-2 flex items-center justify-between">
      <div className="text-xl font-bold">SecureSocial</div>
      <button onClick={handleLogout} className="text-sm font-medium text-gray-700 hover:text-red-600">
        Logout
      </button>
    </nav>
  );
}
