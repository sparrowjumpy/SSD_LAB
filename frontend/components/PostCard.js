export default function PostCard({ post }) {
  return (
    <div className="bg-white shadow rounded p-4 mb-4">
      <h3 className="font-bold text-lg">{post.title}</h3>
      <p className="mt-2 text-gray-700">{post.content}</p>
    </div>
  );
}
