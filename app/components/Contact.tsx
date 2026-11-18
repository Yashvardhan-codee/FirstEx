"use client";

import { useState, FormEvent } from "react";

interface GuidanceData {
  recipientName: string;
  directEmail: string;
  mailtoUrl: string;
  linkedInUrl: string;
  gitHubUrl: string;
  responseExpectation: string;
  tips: string[];
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    honeypot: "", // Bot trap
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [guidance, setGuidance] = useState<GuidanceData | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("singhdiwija@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(
          data.error || "Failed to deliver message. Please contact directly via email or LinkedIn below."
        );
        if (data.guidance) {
          setGuidance(data.guidance);
        }
        return;
      }

      // Success
      setGuidance(data.guidance);
      setFormData({ name: "", email: "", message: "", honeypot: "" });
    } catch (err) {
      console.error("Submission failed:", err);
      setErrorMessage(
        "Network connection interrupted. You can still email me directly at singhdiwija@gmail.com."
      );
    } finally {
      setLoading(false);
    }
  };

  const resetFormState = () => {
    setGuidance(null);
    setErrorMessage(null);
    setFormData({ name: "", email: "", message: "", honeypot: "" });
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-900">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="text-sm font-mono text-indigo-400 font-semibold tracking-wider uppercase">
              03 // Contact & Connect
            </span>
            <div className="h-px bg-slate-800 flex-1" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Let&apos;s Connect & Collaborate
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
            Have a project in mind, an opportunity, or just want to chat tech? Reach out through the form or pick any direct channel below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Contact & Social Links */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-6">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white">
                  Direct Contact Info
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Fastest response via email and LinkedIn. Feel free to copy my address or connect directly.
                </p>
              </div>

              <div className="space-y-4 pt-1">
                {/* Email Direct Card */}
                <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-2 group">
                  <div className="flex items-center justify-between gap-2">
                    <a
                      href="mailto:singhdiwija@gmail.com"
                      className="flex items-center gap-3 text-slate-200 hover:text-white transition-colors min-w-0"
                    >
                      <div className="w-10 h-10 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center shrink-0">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.8}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-mono uppercase text-slate-400">Personal Email</p>
                        <p className="text-sm font-medium text-slate-200 truncate">
                          singhdiwija@gmail.com
                        </p>
                      </div>
                    </a>

                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      title="Copy email to clipboard"
                      className="px-2.5 py-1 text-xs font-mono font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors shrink-0"
                    >
                      {copied ? "Copied!" : "Copy"}
                    </button>
                  </div>
                </div>

                {/* LinkedIn Direct Card */}
                <a
                  href="https://www.linkedin.com/in/yashvardhan-singh-3a3183394/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 p-3.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 hover:border-indigo-500/50 text-slate-200 hover:text-white transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.4 9.74v-8.37H5.06v8.37h2.8z" />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-mono uppercase text-slate-400">LinkedIn Profile</p>
                      <span className="text-xs text-indigo-400 font-mono">Connect ↗</span>
                    </div>
                    <p className="text-sm font-medium text-slate-200 truncate">
                      yashvardhan-singh-3a3183394
                    </p>
                  </div>
                </a>

                {/* GitHub Direct Card */}
                <a
                  href="https://github.com/Yashvardhan-codee"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 p-3.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 hover:border-indigo-500/50 text-slate-200 hover:text-white transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-mono uppercase text-slate-400">GitHub Profile</p>
                      <span className="text-xs text-indigo-400 font-mono">Repositories ↗</span>
                    </div>
                    <p className="text-sm font-medium text-slate-200 truncate">
                      github.com/Yashvardhan-codee
                    </p>
                  </div>
                </a>
              </div>

              {/* SLA / Availability Badge */}
              <div className="pt-2 border-t border-slate-800/80 flex items-center gap-2 text-xs font-mono text-slate-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span>Response expectation: Typically within 12 - 24 hours</span>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Form or Guidance Card */}
          <div className="lg:col-span-7">
            {guidance ? (
              /* Success & Guiding Info Card */
              <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-indigo-500/40 space-y-6 shadow-xl shadow-indigo-500/5 animate-in fade-in zoom-in-95 duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-white">
                      Message Received!
                    </h3>
                    <p className="text-sm text-slate-300">
                      Thank you for reaching out. Your message has been logged securely and delivered to Yashvardhan.
                    </p>
                  </div>
                </div>

                {/* Direct Action Guidance Box */}
                <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-4">
                  <p className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold">
                    Want an even faster response or need to attach files?
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href={guidance.mailtoUrl}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-colors shadow-md shadow-indigo-600/20"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>Open Pre-filled Email</span>
                    </a>

                    <a
                      href={guidance.linkedInUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 font-medium text-sm transition-colors"
                    >
                      <svg className="w-4 h-4 fill-current text-indigo-400" viewBox="0 0 24 24">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.4 9.74v-8.37H5.06v8.37h2.8z" />
                      </svg>
                      <span>Message on LinkedIn</span>
                    </a>
                  </div>

                  <ul className="space-y-1.5 pt-2 text-xs text-slate-400 list-disc list-inside">
                    {guidance.tips.map((tip, idx) => (
                      <li key={idx}>{tip}</li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={resetFormState}
                    className="text-xs font-mono text-slate-400 hover:text-white underline underline-offset-4 transition-colors"
                  >
                    ← Send another message
                  </button>
                </div>
              </div>
            ) : (
              /* Standard Form */
              <form
                onSubmit={handleSubmit}
                className="p-6 sm:p-8 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white">
                    Send a Message
                  </h3>
                  <span className="text-xs font-mono text-slate-400">
                    Protected & Rate-limited
                  </span>
                </div>

                {/* Error Banner */}
                {errorMessage && (
                  <div className="p-4 rounded-xl bg-rose-950/80 border border-rose-800/60 text-rose-200 text-sm space-y-2 animate-in fade-in duration-200">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-rose-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <span className="font-medium">{errorMessage}</span>
                    </div>
                  </div>
                )}

                {/* Anti-spam Honeypot (hidden from human users) */}
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                {/* Name Field */}
                <div className="space-y-2">
                  <label htmlFor="contact-name" className="block text-sm font-mono text-slate-300">
                    Your Name <span className="text-indigo-400">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    maxLength={80}
                    disabled={loading}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Smith"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors disabled:opacity-50"
                  />
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label htmlFor="contact-email" className="block text-sm font-mono text-slate-300">
                    Your Email <span className="text-indigo-400">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    maxLength={120}
                    disabled={loading}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors disabled:opacity-50"
                  />
                </div>

                {/* Message Field */}
                <div className="space-y-2">
                  <label htmlFor="contact-message" className="block text-sm font-mono text-slate-300">
                    Message <span className="text-indigo-400">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    required
                    maxLength={3000}
                    disabled={loading}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your project, offer, or question..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors resize-none disabled:opacity-50"
                  />
                  <div className="flex justify-between text-xs text-slate-500 font-mono">
                    <span>Minimum 5 characters</span>
                    <span>{formData.message.length} / 3000</span>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800/60 disabled:cursor-not-allowed text-white font-medium text-base shadow-lg shadow-indigo-600/30 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-indigo-600/50 active:translate-y-0"
                >
                  {loading ? (
                    <>
                      <svg className="w-5 h-5 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      <span>Processing & Delivering...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
