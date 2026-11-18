export interface ProjectCardProps {
  title: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  status?: string;
}

export default function ProjectCard({
  title,
  description,
  techStack,
  githubUrl,
  status,
}: ProjectCardProps) {
  return (
    <div className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-indigo-500/50 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-indigo-500/10 backdrop-blur-sm">
      {/* Glow on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

      <div className="space-y-4">
        {/* Card Header & Status */}
        <div className="flex items-center justify-between gap-2">
          <div className="w-10 h-10 rounded-xl bg-indigo-950/60 border border-indigo-800/40 flex items-center justify-center text-indigo-400 group-hover:text-indigo-300 group-hover:border-indigo-500/50 transition-colors">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.75}
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
              />
            </svg>
          </div>
          {status && (
            <span className="px-2.5 py-1 text-xs font-mono font-medium rounded-full bg-slate-800 text-slate-300 border border-slate-700/60">
              {status}
            </span>
          )}
        </div>

        {/* Project Title */}
        <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
          {title}
        </h3>

        {/* Project Description */}
        <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
          {description}
        </p>

        {/* Tech Stack Chips */}
        <div className="flex flex-wrap gap-1.5 pt-2">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="text-xs font-mono px-2.5 py-1 rounded-md bg-slate-800/80 text-indigo-300 border border-slate-700/40"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* GitHub Link Action */}
      <div className="pt-6 mt-4 border-t border-slate-800/80 flex items-center justify-between">
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors group/link"
        >
          {/* GitHub Icon */}
          <svg
            className="w-4 h-4 fill-current text-slate-400 group-hover/link:text-indigo-400 transition-colors"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            />
          </svg>
          <span>View on GitHub</span>
          <svg
            className="w-3.5 h-3.5 text-slate-500 group-hover/link:text-indigo-400 group-hover/link:translate-x-0.5 transition-all"
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
  );
}
