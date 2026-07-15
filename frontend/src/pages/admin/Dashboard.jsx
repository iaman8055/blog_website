import { useEffect, useState } from "react";
import { getAllPostsAdmin } from "../../api/postApi";
import { getUsers } from "../../api/userApi";

export default function Dashboard() {
  const [stats, setStats] = useState({ posts: 0, users: 0 });

  useEffect(() => {
    Promise.all([getAllPostsAdmin(), getUsers()]).then(([posts, users]) => {
      setStats({ posts: posts.length, users: users.length });
    });
  }, []);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold text-gray-900">Dashboard</h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <p className="text-sm text-gray-500">Total Posts</p>
          <p className="text-3xl font-semibold text-gray-900">{stats.posts}</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <p className="text-sm text-gray-500">Total Users</p>
          <p className="text-3xl font-semibold text-gray-900">{stats.users}</p>
        </div>
      </div>
    </div>
  );
}
