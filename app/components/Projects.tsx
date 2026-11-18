import ProjectCard, { ProjectCardProps } from "./ProjectCard";

export default function Projects() {
  const projectsData: ProjectCardProps[] = [
    {
      title: "Personal Developer Portfolio",
      description:
        "Modern and responsive portfolio website built with Next.js App Router, TypeScript, and Tailwind CSS. Features modular component architecture, smooth navigation, and dark tech styling.",
      techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
      githubUrl: "https://github.com/Yashvardhan-codee",
      status: "Featured",
    },
    {
      title: "Interactive React Task Dashboard",
      description:
        "A dynamic web dashboard built with React and modern JavaScript. Implements state management, clean responsive card layouts, and real-time interactive UI controls.",
      techStack: ["React", "JavaScript", "CSS3", "HTML5"],
      githubUrl: "https://github.com/Yashvardhan-codee",
      status: "Active",
    },
    {
      title: "Python Automation & Scripts Suite",
      description:
        "A collection of Python scripts exploring algorithmic problem solving, system file automation, and data processing utilities crafted for speed and modularity.",
      techStack: ["Python", "Algorithms", "Automation", "CLI"],
      githubUrl: "https://github.com/Yashvardhan-codee",
      status: "In Progress",
    },
  ];

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-900">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="text-sm font-mono text-indigo-400 font-semibold tracking-wider uppercase">
              02 // Projects
            </span>
            <div className="h-px bg-slate-800 flex-1" />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                Featured Work & Experiments
              </h2>
              <p className="text-slate-400 text-sm sm:text-base mt-1">
                A selection of applications and utilities I have built and am currently developing.
              </p>
            </div>

            <a
              href="https://github.com/Yashvardhan-codee"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-mono text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              <span>Explore all on GitHub</span>
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
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projectsData.map((project) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              description={project.description}
              techStack={project.techStack}
              githubUrl={project.githubUrl}
              status={project.status}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
