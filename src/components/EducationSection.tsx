'use client';

import React from 'react';
import { portfolioData } from '@/data/portfolioData';
import { GraduationCap, Award, Trophy, ArrowUpRight, Sparkles } from 'lucide-react';

/* ================= BRAND & UNIVERSITY VECTOR LOGOS ================= */

function LogoUCSD({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <div className={`${className} rounded-xl bg-[#002855] border border-[#FFCD00]/40 flex items-center justify-center p-1 shadow-sm shrink-0`}>
      <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
        {/* UCSD Triton & Sun Crest Motif */}
        <circle cx="50" cy="50" r="46" stroke="#FFCD00" strokeWidth="6" fill="#002855" />
        <path d="M50 15 L50 85 M15 50 L85 50" stroke="#FFCD00" strokeWidth="4" opacity="0.4" />
        <path d="M32 32 L50 18 L68 32 L58 48 L50 38 L42 48 Z" fill="#FFCD00" />
        <text x="50" y="76" textAnchor="middle" fill="#FFCD00" fontSize="22" fontWeight="900" fontFamily="sans-serif">
          UCSD
        </text>
      </svg>
    </div>
  );
}

function LogoSkyline({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <div className={`${className} rounded-xl bg-[#004830] border border-emerald-400/40 flex items-center justify-center p-1 shadow-sm shrink-0`}>
      <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
        <circle cx="50" cy="50" r="46" stroke="#34d399" strokeWidth="6" fill="#004830" />
        {/* Skyline College Birds & Waves */}
        <path d="M25 45 Q50 20 75 45 Q50 65 25 45 Z" fill="#34d399" />
        <text x="50" y="78" textAnchor="middle" fill="#ffffff" fontSize="16" fontWeight="900" fontFamily="sans-serif">
          SKYLINE
        </text>
      </svg>
    </div>
  );
}

function LogoDeepLearningAI({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <div className={`${className} rounded-lg bg-[#0e1628] border border-cyan-500/30 flex items-center justify-center p-1 shrink-0 shadow-sm`}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* DeepLearning.AI Signature Geometric Diamond Neural Net */}
        <polygon points="50,12 85,32 85,68 50,88 15,68 15,32" fill="#ff4154" opacity="0.9" />
        <polygon points="50,22 75,37 75,63 50,78 25,63 25,37" fill="#1b2a47" />
        <circle cx="50" cy="50" r="10" fill="#00f0ff" />
        <line x1="50" y1="22" x2="50" y2="40" stroke="#00f0ff" strokeWidth="4" />
        <line x1="75" y1="63" x2="58" y2="54" stroke="#ff4154" strokeWidth="4" />
        <line x1="25" y1="63" x2="42" y2="54" stroke="#ffbe0b" strokeWidth="4" />
      </svg>
    </div>
  );
}

function LogoStanford({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <div className={`${className} rounded-lg bg-[#8C1515] border border-red-400/40 flex items-center justify-center p-0.5 shrink-0 shadow-sm`}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Stanford Block S with Tree Motif */}
        <text x="50" y="72" textAnchor="middle" fill="#FFFFFF" fontSize="62" fontWeight="900" fontFamily="Georgia, serif">
          S
        </text>
        <path d="M50 24 L56 40 L52 40 L57 54 L52 54 L58 68 L42 68 L48 54 L43 54 L48 40 L44 40 Z" fill="#007C66" />
      </svg>
    </div>
  );
}

function LogoAWS({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <div className={`${className} rounded-lg bg-[#232F3E] border border-amber-500/40 flex items-center justify-center p-1 shrink-0 shadow-sm`}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* AWS Orange Smile */}
        <text x="50" y="45" textAnchor="middle" fill="#FFFFFF" fontSize="26" fontWeight="900" fontFamily="sans-serif">
          aws
        </text>
        <path d="M22 62 Q50 82 78 62" stroke="#FF9900" strokeWidth="7" strokeLinecap="round" fill="none" />
        <polygon points="76,56 84,65 72,68" fill="#FF9900" />
      </svg>
    </div>
  );
}

function LogoGoogleCloud({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <div className={`${className} rounded-lg bg-[#1a1f2c] border border-blue-400/40 flex items-center justify-center p-1 shrink-0 shadow-sm`}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* 4-Color Google Cloud Platform */}
        <path d="M38 65 L28 55 Q20 40 35 30 Q50 20 62 32 Q78 28 82 45 Q88 60 74 65 Z" fill="#4285F4" opacity="0.3" />
        <path d="M32 60 L24 50 A15 15 0 0 1 45 35 A22 22 0 0 1 72 40 A16 16 0 0 1 78 60 Z" stroke="#4285F4" strokeWidth="6" fill="none" />
        <circle cx="34" cy="52" r="5" fill="#EA4335" />
        <circle cx="50" cy="38" r="5" fill="#FBBC05" />
        <circle cx="66" cy="50" r="5" fill="#34A853" />
      </svg>
    </div>
  );
}

function LogoMichigan({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <div className={`${className} rounded-lg bg-[#00274C] border border-[#FFCB05]/50 flex items-center justify-center p-0.5 shrink-0 shadow-sm`}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Michigan Block M */}
        <text x="50" y="74" textAnchor="middle" fill="#FFCB05" fontSize="68" fontWeight="900" fontFamily="sans-serif">
          M
        </text>
      </svg>
    </div>
  );
}

function LogoHarvard({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <div className={`${className} rounded-lg bg-[#A51C30] border border-red-300/40 flex items-center justify-center p-0.5 shrink-0 shadow-sm`}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Harvard Crimson Shield */}
        <path d="M20 18 H80 V60 Q80 82 50 92 Q20 82 20 60 Z" fill="#A51C30" stroke="#FFFFFF" strokeWidth="4" />
        <text x="50" y="58" textAnchor="middle" fill="#FFFFFF" fontSize="24" fontWeight="900" fontFamily="serif">
          CS50
        </text>
      </svg>
    </div>
  );
}

function LogoIBM({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <div className={`${className} rounded-lg bg-[#0f172a] border border-blue-500/40 flex items-center justify-center p-1 shrink-0 shadow-sm`}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* IBM 8-Bar Blue Monogram */}
        <text x="50" y="65" textAnchor="middle" fill="#0062FF" fontSize="38" fontWeight="900" fontFamily="Courier, monospace" letterSpacing="-2">
          IBM
        </text>
        <line x1="15" y1="36" x2="85" y2="36" stroke="#0f172a" strokeWidth="4" />
        <line x1="15" y1="46" x2="85" y2="46" stroke="#0f172a" strokeWidth="4" />
        <line x1="15" y1="56" x2="85" y2="56" stroke="#0f172a" strokeWidth="4" />
      </svg>
    </div>
  );
}

function LogoUNDP({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <div className={`${className} rounded-lg bg-[#006EB5] border border-sky-300/40 flex items-center justify-center p-1 shrink-0 shadow-sm`}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* UN Globe & Laurel Motif */}
        <circle cx="50" cy="50" r="38" stroke="#FFFFFF" strokeWidth="5" fill="none" opacity="0.8" />
        <ellipse cx="50" cy="50" rx="38" ry="18" stroke="#FFFFFF" strokeWidth="4" fill="none" opacity="0.8" />
        <line x1="50" y1="12" x2="50" y2="88" stroke="#FFFFFF" strokeWidth="4" opacity="0.8" />
        <text x="50" y="58" textAnchor="middle" fill="#FFFFFF" fontSize="16" fontWeight="900" fontFamily="sans-serif">
          UN
        </text>
      </svg>
    </div>
  );
}

// Function to resolve the proper certificate issuer logo
function getCertLogo(name: string, issuer: string) {
  const combined = `${name} ${issuer}`.toLowerCase();
  
  if (combined.includes('michigan') || combined.includes('python for everybody')) {
    return <LogoMichigan />;
  }
  if (combined.includes('google') || combined.includes('gcp') || combined.includes('vertex')) {
    return <LogoGoogleCloud />;
  }
  if (combined.includes('stanford')) {
    return <LogoStanford />;
  }
  if (combined.includes('aws') || combined.includes('amazon')) {
    return <LogoAWS />;
  }
  if (combined.includes('harvard') || combined.includes('cs50')) {
    return <LogoHarvard />;
  }
  if (combined.includes('ibm') || combined.includes('scrum')) {
    return <LogoIBM />;
  }
  if (combined.includes('undp') || combined.includes('frontier tech') || combined.includes('myanmar')) {
    return <LogoUNDP />;
  }
  return <LogoDeepLearningAI />;
}

export function EducationSection() {
  const { education, certifications, honors } = portfolioData;

  return (
    <section id="education" className="mb-32 scroll-mt-28">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-black uppercase tracking-[0.3em] mb-4">
          <Sparkles className="w-3 h-3" />
          <span>ACADEMIC FOUNDATION &amp; CREDENTIALS</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
          Education &amp; <span className="text-cyan-400">Certifications</span>
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
              <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center border border-cyan-500/20">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight text-white">Education</h3>
            </div>

            <div className="space-y-6">
              {education.map((edu) => {
                const isUCSD = edu.school.toLowerCase().includes('san diego') || edu.school.toLowerCase().includes('ucsd');
                
                return (
                  <div
                    key={edu.school}
                    className="p-5 rounded-2xl bg-[#181818]/70 border border-white/5 relative group hover:border-cyan-500/30 transition-colors"
                  >
                    <div className="flex items-start gap-3.5 mb-2">
                      {/* School Brand Crest Logo */}
                      {isUCSD ? <LogoUCSD className="w-10 h-10" /> : <LogoSkyline className="w-10 h-10" />}

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-0.5">
                          <h4 className="text-base font-black text-white group-hover:text-cyan-300 transition-colors">
                            {edu.school}
                          </h4>
                          <span className="text-[10px] font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-md border border-cyan-500/20 w-fit">
                            {edu.badge || edu.period}
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-gray-300">{edu.degree}</p>
                        <p className="text-[11px] text-gray-400">
                          {edu.location} · {edu.period}
                        </p>
                      </div>
                    </div>

                    {edu.coursework && (
                      <div className="flex flex-wrap gap-1.5 pt-3 mt-2 border-t border-white/5">
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
                );
              })}
            </div>
          </div>

          {/* Honors & Scholarships with Verification Links */}
          <div className="rounded-[2.5rem] p-7 sm:p-9 bg-[#121212]/70 backdrop-blur-xl border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.4)]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center border border-cyan-500/20">
                <Trophy className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight text-white">
                Honors &amp; Scholarships
              </h3>
            </div>

            <div className="space-y-4">
              {honors.map((honor) => {
                const Content = (
                  <div className="flex flex-col w-full">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="text-sm font-black text-white group-hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                        <span>{honor.title}</span>
                        {honor.link && (
                          <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400 shrink-0 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                        )}
                      </h4>
                      <span className="text-[10px] font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded shrink-0 ml-2">
                        {honor.year}
                      </span>
                    </div>
                    <p className="text-xs text-cyan-400/90 font-semibold mb-1">{honor.award}</p>
                    <p className="text-xs text-gray-400 leading-relaxed">{honor.detail}</p>
                  </div>
                );

                return honor.link ? (
                  <a
                    key={honor.title}
                    href={honor.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block p-4 rounded-2xl bg-[#181818]/70 border border-white/5 hover:border-cyan-500/40 hover:bg-[#1a1a1a] transition-all duration-200 cursor-pointer"
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

        {/* Right Column: Verified Certifications with Brand Logos */}
        <div className="lg:col-span-6 space-y-6">
          <div className="rounded-[2.5rem] p-7 sm:p-9 bg-[#121212]/70 backdrop-blur-xl border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.4)] h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center border border-cyan-500/20">
                    <Award className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-black uppercase tracking-tight text-white">
                    Verified Certifications
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/20 flex items-center gap-1">
                  <span>Click to Verify</span>
                  <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>

              <div className="space-y-6">
                {certifications.map((group) => (
                  <div key={group.issuer} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-black uppercase tracking-widest text-cyan-400">
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
                          className="group flex items-center justify-between gap-3 p-3.5 rounded-xl bg-[#181818]/60 border border-white/5 hover:border-cyan-500/40 hover:bg-[#1c1c1c] transition-all duration-200"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            {/* Official Issuer Brand Vector Logo */}
                            {getCertLogo(cert.name, cert.issuer)}

                            <div className="min-w-0">
                              <span className="text-xs font-bold text-gray-200 group-hover:text-white transition-colors block truncate">
                                {cert.name}
                              </span>
                              <span className="text-[10px] text-gray-400 font-mono flex items-center gap-1.5">
                                <span>{cert.issuer}</span>
                              </span>
                            </div>
                          </div>

                          <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-cyan-400 group-hover:bg-cyan-500/10 transition-colors shrink-0">
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
            <div className="mt-8 p-4 rounded-2xl bg-cyan-500/5 border border-cyan-500/20 text-center">
              <p className="text-xs text-gray-400">
                All certificates verified with cryptographic IDs via{' '}
                <span className="text-cyan-400 font-semibold">Coursera, Stanford Online, Google Cloud &amp; Harvard</span>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
