import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import PostCard from '../components/PostCard';

export default function Feed() {
    const router = useRouter();
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            router.push('/login');
            return;
        }

        fetch('http://localhost:8000/api/posts', {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then((data) => setPosts(data))
            .catch((err) => console.error(err));
    }, []);

    const handleCreatePost = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('access_token');
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        if (image) formData.append('image', image);

        const res = await fetch('http://localhost:8000/api/posts/create', {
            method: 'POST',
            headers: { Authorization: `Bearer ${token}` },
            body: formData,
        });

        if (res.ok) {
            const newPost = await res.json();
            setPosts([newPost, ...posts]);
            setTitle('');
            setContent('');
            setImage(null);
        } else {
            alert('Failed to create post');
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar />
            <main className="max-w-2xl mx-auto p-4">
                <form onSubmit={handleCreatePost} className="mb-4">
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="border rounded w-full mb-2"
                        required
                    />
                    <textarea
                        placeholder="Content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="border rounded w-full mb-2"
                        required
                    />
                    <input
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                        className="mb-2"
                    />
                    <button className="bg-blue-600 text-white px-4 py-2 rounded">
                        Post
                    </button>
                </form>
                {posts.map((post, idx) => (
                    <PostCard key={idx} post={post} />
                ))}
            </main>
        </div>
    );
}
