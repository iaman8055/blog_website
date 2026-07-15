import { useEffect, useState } from "react";
import { createPost, deletePost, getAllPostsAdmin, updatePost } from "../../api/postApi";
import PostFormModal from "../../components/admin/PostFormModal";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalState, setModalState] = useState(null); // null | "create" | post object

  const load = () => {
    setLoading(true);
    getAllPostsAdmin()
      .then(setPosts)
      .catch(() => setError("Failed to load posts"))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleSave = async (data) => {
    if (modalState === "create") {
      await createPost(data);
    } else {
      await updatePost(modalState._id, data);
    }
    setModalState(null);
    load();
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this post?")) return;
    await deletePost(id);
    load();
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Posts</h1>
        <button
          onClick={() => setModalState("create")}
          className="rounded bg-gray-900 px-4 py-2 text-sm text-white hover:bg-gray-700"
        >
          New Post
        </button>
      </div>

      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && (
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Author</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post._id} className="border-t border-gray-100">
                  <td className="px-4 py-2">{post.title}</td>
                  <td className="px-4 py-2 capitalize">{post.status}</td>
                  <td className="px-4 py-2">{post.author?.name}</td>
                  <td className="px-4 py-2 text-right">
                    <button
                      onClick={() => setModalState(post)}
                      className="mr-3 text-gray-700 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(post._id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modalState && (
        <PostFormModal
          initial={modalState === "create" ? null : modalState}
          onSave={handleSave}
          onClose={() => setModalState(null)}
        />
      )}
    </div>
  );
}
