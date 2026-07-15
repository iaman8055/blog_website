import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  return (
    <Link
      to={`/posts/${post.slug}`}
      className="block rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md"
    >
      {post.coverImage && (
        <img
          src={post.coverImage}
          alt={post.title}
          className="mb-4 h-40 w-full rounded object-cover"
        />
      )}
      <h2 className="text-xl font-semibold text-gray-900">{post.title}</h2>
      <p className="mt-2 line-clamp-3 text-sm text-gray-600">{post.excerpt || post.content}</p>
      <div className="mt-3 text-xs text-gray-400">
        {post.author?.name} · {new Date(post.createdAt).toLocaleDateString()}
      </div>
    </Link>
  );
}
