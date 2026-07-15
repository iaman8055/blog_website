import { useEffect, useState } from "react";
import { getPosts } from "../api/postApi";
import PostCard from "../components/PostCard";
import {
  BottomBannerAd,
  InContentAd,
  SidebarAd,
  StickyFooterAd,
  TopBannerAd,
} from "../components/ads/AdPlacements";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getPosts()
      .then(setPosts)
      .catch(() => setError("Failed to load posts"))
      .finally(() => setLoading(false));
  }, []);

  const withInContentAds = [];
  posts.forEach((post, index) => {
    withInContentAds.push(<PostCard key={post._id} post={post} />);
    if (index === 2 || index === 5) {
      withInContentAds.push(<InContentAd key={`ad-${index}`} />);
    }
  });

  return (
    <div className="mx-auto max-w-5xl px-4">
      <TopBannerAd />

      <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_300px]">
        <div className="space-y-6">
          <h1 className="text-2xl font-semibold text-gray-900">Latest Posts</h1>
          {loading && <p className="text-gray-500">Loading posts...</p>}
          {error && <p className="text-red-600">{error}</p>}
          {!loading && !error && posts.length === 0 && (
            <p className="text-gray-500">No posts published yet.</p>
          )}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">{withInContentAds}</div>
        </div>
        <aside>
          <SidebarAd />
        </aside>
      </div>

      <BottomBannerAd />
      <StickyFooterAd />
    </div>
  );
}
