export default function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Tech Glow Elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-600/10 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto text-center space-y-8">
        {/* Status Chip */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium bg-slate-900 border border-slate-800 text-indigo-400 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Computer Science Student & Web Developer</span>
        </div>

        {/* Large Name Heading */}
        <div className="space-y-3">
          <p className="text-sm sm:text-base font-mono uppercase tracking-widest text-slate-400">
            Hello World, I am
          </p>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white">
            <span className="bg-gradient-to-r from-white via-indigo-100 to-indigo-400 bg-clip-text text-transparent">
              Yashvardhan Raj Singh
            </span>
          </h1>
        </div>

        {/* One-Line Intro */}
        <p className="max-w-2xl mx-auto text-lg sm:text-xl md:text-2xl text-slate-300 font-light leading-relaxed">
          CS student who loves building modern web apps, experimenting with code,
          and turning ideas into interactive software.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <a
            href="#projects"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-base shadow-lg shadow-indigo-600/25 transition-all duration-200 hover:-translate-y-1 hover:shadow-indigo-600/40 active:translate-y-0"
          >
            <span>View my work</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </a>

          <a
            href="#contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 font-medium text-base transition-all duration-200 hover:-translate-y-1 hover:border-slate-600 active:translate-y-0"
          >
            <span>Contact me</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
