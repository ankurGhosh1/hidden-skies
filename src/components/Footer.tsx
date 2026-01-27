export default function Footer() {
  return (
    <footer className="bg-black/30 backdrop-blur-lg border-t border-white/10 py-12 text-center text-white/80 mt-auto">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-lg mb-4">
          © {new Date().getFullYear()} The Occult Observer – Question Everything.
        </p>
        <div className="flex justify-center space-x-8 text-sm">
          {/* <a href="/privacy" className="hover:text-white transition-colors">Privacy</a> */}
          <a href="/" className="hover:text-white transition-colors">Home</a>
          <a href="/blog" className="hover:text-white transition-colors">Blogs</a>
        </div>
      </div>
    </footer>
  );
}