export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-900 bg-slate-950/80 py-8 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <p className="text-sm font-mono text-slate-400">
          © 2026 Yashvardhan Raj Singh
        </p>

        <div className="flex items-center gap-6 text-xs text-slate-500 font-mono">
          <a
            href="https://github.com/Yashvardhan-codee"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-400 transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/yashvardhan-singh-3a3183394/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-400 transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="mailto:singhdiwija@gmail.com"
            className="hover:text-indigo-400 transition-colors"
          >
            Email
          </a>
          <a
            href="#"
            className="hover:text-slate-300 transition-colors"
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
