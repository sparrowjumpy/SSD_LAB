import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-4xl font-bold mb-4">Welcome to SecureSocial</h1>
      <p className="mb-6">A highly secure, modern social platform.</p>
      <div className="space-x-4">
        <Link href="/register" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Register
        </Link>
        <Link href="/login" className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
          Login
        </Link>
      </div>
    </main>
  );
}
