export default function About() {
  const skills = [
    { name: "HTML", category: "Frontend" },
    { name: "CSS", category: "Frontend" },
    { name: "JavaScript", category: "Language" },
    { name: "React", category: "Frontend" },
    { name: "Python", category: "Backend / Language" },
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-900">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="text-sm font-mono text-indigo-400 font-semibold tracking-wider uppercase">
              01 // About Me
            </span>
            <div className="h-px bg-slate-800 flex-1" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Background & Technical Skills
          </h2>
        </div>

        {/* Bio Content & Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Bio text */}
          <div className="md:col-span-7 space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              I am a Computer Science student with a strong passion for web
              development, modern software architectures, and clean UI engineering.
              I spend my time exploring frontend frameworks like React and
              harnessing Python for computational problem-solving.
            </p>
            <p>
              Driven by curiosity, I love turning complex challenges into clean,
              functional digital products. Whether it&apos;s crafting responsive web
              interfaces or writing efficient automation scripts, I am constantly
              learning and eager to collaborate on real-world engineering projects.
            </p>
          </div>

          {/* Skills box */}
          <div className="md:col-span-5 p-6 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-mono uppercase tracking-wider text-slate-400">
                Core Technologies
              </h3>
              <span className="text-xs font-mono text-indigo-400">
                {skills.length} skills
              </span>
            </div>

            <div className="flex flex-wrap gap-2.5 pt-1">
              {skills.map((skill) => (
                <div
                  key={skill.name}
                  className="group inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/60 hover:border-indigo-500/60 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:shadow-indigo-500/10 cursor-default"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 group-hover:scale-125 transition-transform" />
                  <span>{skill.name}</span>
                </div>
              ))}
            </div>

            <p className="text-xs text-slate-500 pt-2 font-mono">
              Always expanding my toolkit with modern web and backend tools.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
