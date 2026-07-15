export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white py-6 pb-14 text-center text-sm text-gray-500">
      © {new Date().getFullYear()} DevBlog. All rights reserved.
    </footer>
  );
}
