'use client';

import React from 'react';
import { portfolioData } from '@/data/portfolioData';
import { GraduationCap, Award, Trophy, ArrowUpRight, CheckCircle2, Sparkles } from 'lucide-react';

export function EducationSection() {
  const { education, certifications, honors } = portfolioData;

  return (
    <section id="education" className="mb-32 scroll-mt-28">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-[0.3em] mb-4">
          <Sparkles className="w-3 h-3" />
          <span>ACADEMIC FOUNDATION & CREDENTIALS</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
          Education & <span className="text-emerald-400">Certifications</span>
        </h2>
        <p className="text-gray-400 text-sm mt-3 max-w-xl mx-auto">
          Rigorous mathematical coursework, national scholarship honors, and verified specializations in Deep Learning, Generative AI, and Cloud Architecture.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Education & Honors */}
        <div className="lg:col-span-6 space-y-6">
          {/* Education Card */}
          <div className="rounded-[2.5rem] p-7 sm:p-9 bg-[#121212]/70 backdrop-blur-xl border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.4)]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight text-white">Education</h3>
            </div>

            <div className="space-y-6">
              {education.map((edu) => (
                <div
                  key={edu.school}
                  className="p-5 rounded-2xl bg-[#181818]/70 border border-white/5 relative"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                    <h4 className="text-base font-black text-white">{edu.school}</h4>
                    <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20 w-fit">
                      {edu.badge || edu.period}
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-gray-300 mb-1">{edu.degree}</p>
                  <p className="text-[11px] text-gray-400 mb-3">
                    {edu.location} · {edu.period}
                  </p>

                  {edu.coursework && (
                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
                      {edu.coursework.map((course) => (
                        <span
                          key={course}
                          className="text-[9px] font-bold px-2 py-0.5 rounded bg-white/5 text-gray-300"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Honors & Scholarships with Verification Links */}
          <div className="rounded-[2.5rem] p-7 sm:p-9 bg-[#121212]/70 backdrop-blur-xl border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.4)]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                <Trophy className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight text-white">
                Honors & Scholarships
              </h3>
            </div>

            <div className="space-y-4">
              {honors.map((honor) => {
                const Content = (
                  <div className="flex flex-col w-full">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="text-sm font-black text-white group-hover:text-emerald-300 transition-colors flex items-center gap-1.5">
                        <span>{honor.title}</span>
                        {honor.link && (
                          <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400 shrink-0 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                        )}
                      </h4>
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded shrink-0 ml-2">
                        {honor.year}
                      </span>
                    </div>
                    <p className="text-xs text-emerald-400/90 font-semibold mb-1">{honor.award}</p>
                    <p className="text-xs text-gray-400 leading-relaxed">{honor.detail}</p>
                  </div>
                );

                return honor.link ? (
                  <a
                    key={honor.title}
                    href={honor.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block p-4 rounded-2xl bg-[#181818]/70 border border-white/5 hover:border-emerald-500/40 hover:bg-[#1a1a1a] transition-all duration-200 cursor-pointer"
                  >
                    {Content}
                  </a>
                ) : (
                  <div key={honor.title} className="p-4 rounded-2xl bg-[#181818]/70 border border-white/5">
                    {Content}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Verified Certifications */}
        <div className="lg:col-span-6 space-y-6">
          <div className="rounded-[2.5rem] p-7 sm:p-9 bg-[#121212]/70 backdrop-blur-xl border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.4)] h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                    <Award className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-black uppercase tracking-tight text-white">
                    Verified Certifications
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 flex items-center gap-1">
                  <span>Click to Verify</span>
                  <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>

              <div className="space-y-6">
                {certifications.map((group) => (
                  <div key={group.issuer} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-black uppercase tracking-widest text-emerald-400">
                        {group.issuer}
                      </h4>
                      <span className="text-[10px] font-mono text-gray-400">{group.period}</span>
                    </div>

                    <div className="space-y-2.5">
                      {group.certs.map((cert, idx) => (
                        <a
                          key={idx}
                          href={cert.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center justify-between gap-3 p-3.5 rounded-xl bg-[#181818]/60 border border-white/5 hover:border-emerald-500/40 hover:bg-[#1c1c1c] transition-all duration-200"
                        >
                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            <div>
                              <span className="text-xs font-medium text-gray-200 group-hover:text-white transition-colors block">
                                {cert.name}
                              </span>
                              <span className="text-[10px] text-gray-500 font-mono">
                                {cert.issuer}
                              </span>
                            </div>
                          </div>

                          <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-emerald-400 group-hover:bg-emerald-500/10 transition-colors shrink-0">
                            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Verification Footer Note */}
            <div className="mt-8 p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 text-center">
              <p className="text-xs text-gray-400">
                All certificates verified with cryptographic IDs via{' '}
                <span className="text-emerald-400 font-semibold">Coursera, Stanford Online & Google Cloud</span>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
