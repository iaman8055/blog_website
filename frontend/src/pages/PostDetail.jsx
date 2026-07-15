import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPostBySlug } from "../api/postApi";
import { BottomBannerAd, StickyFooterAd, TopBannerAd } from "../components/ads/AdPlacements";

export default function PostDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getPostBySlug(slug)
      .then(setPost)
      .catch(() => setError("Post not found"))
      .finally(() => setLoading(false));
  }, [slug]);

  return (
    <div className="mx-auto max-w-3xl px-4">
      <TopBannerAd />

      {loading && <p className="text-gray-500">Loading...</p>}
      {error && (
        <div className="py-10 text-center">
          <p className="text-red-600">{error}</p>
          <Link to="/" className="mt-2 inline-block text-gray-900 underline">
            Back to home
          </Link>
        </div>
      )}

      {post && (
        <article className="py-8">
          {post.coverImage && (
            <img
              src={post.coverImage}
              alt={post.title}
              className="mb-6 max-h-96 w-full rounded object-cover"
            />
          )}
          <h1 className="text-3xl font-semibold text-gray-900">{post.title}</h1>
          <div className="mt-2 text-sm text-gray-400">
            {post.author?.name} · {new Date(post.createdAt).toLocaleDateString()}
          </div>
          <div className="mt-6 whitespace-pre-wrap text-gray-700">{post.content}</div>
        </article>
      )}

      <BottomBannerAd />
      <StickyFooterAd />
    </div>
  );
}
