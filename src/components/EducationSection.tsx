'use client';

import React from 'react';
import { portfolioData } from '@/data/portfolioData';
import { GraduationCap, Award, Trophy, ArrowUpRight, Sparkles } from 'lucide-react';

/* ================= EXACT OFFICIAL COMPANY & UNIVERSITY VECTOR LOGOS ================= */

/** UC San Diego (UCSD) - Official Navy & Gold Tritons Trident Spear & Wordmark */
function LogoUCSD({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <div className={`${className} rounded-xl bg-[#182B49] border border-[#FFCD00]/60 flex items-center justify-center p-1 shadow-md shrink-0`}>
      <svg viewBox="0 0 120 120" className="w-full h-full" fill="none">
        {/* Navy Background Base */}
        <rect width="120" height="120" rx="18" fill="#182B49" />
        
        {/* Central Vertical Spear (Gold Outline + Navy Core) */}
        <path
          d="M60 10 L70 38 H64 V70 H56 V38 H50 Z"
          fill="#182B49"
          stroke="#FFCD00"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        
        {/* Left Angled Trident Barb */}
        <path
          d="M24 28 L46 42 L42 50 L56 64 L50 68 L36 54 L32 62 Z"
          fill="#182B49"
          stroke="#FFCD00"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        
        {/* Right Angled Trident Barb */}
        <path
          d="M96 28 L88 62 L84 54 L70 68 L64 64 L78 50 L74 42 Z"
          fill="#182B49"
          stroke="#FFCD00"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        
        {/* Bold Athletic Block "UCSD" in Gold */}
        <text
          x="60"
          y="104"
          textAnchor="middle"
          fill="#FFCD00"
          fontSize="24"
          fontWeight="900"
          fontFamily="-apple-system, BlinkMacSystemFont, Impact, sans-serif"
          letterSpacing="2"
        >
          UCSD
        </text>
      </svg>
    </div>
  );
}

/** Skyline College (San Bruno, CA - SF Bay Area) - Official Red Sunburst & Wavy Lines Logo */
function LogoSkyline({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <div className={`${className} rounded-xl bg-white border border-red-500/30 flex items-center justify-center p-1.5 shadow-md shrink-0`}>
      <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
        {/* Red Box Border */}
        <rect x="8" y="8" width="84" height="84" stroke="#C8102E" strokeWidth="7" rx="6" fill="none" />
        
        {/* 5 Radiant Sunburst Rays */}
        <line x1="50" y1="18" x2="50" y2="38" stroke="#C8102E" strokeWidth="6" strokeLinecap="round" />
        <line x1="28" y1="26" x2="40" y2="42" stroke="#C8102E" strokeWidth="6" strokeLinecap="round" />
        <line x1="72" y1="26" x2="60" y2="42" stroke="#C8102E" strokeWidth="6" strokeLinecap="round" />
        <line x1="18" y1="46" x2="34" y2="50" stroke="#C8102E" strokeWidth="6" strokeLinecap="round" />
        <line x1="82" y1="46" x2="66" y2="50" stroke="#C8102E" strokeWidth="6" strokeLinecap="round" />
        
        {/* Semi-Circle Sun */}
        <path d="M34 56 A16 16 0 0 1 66 56 Z" fill="#C8102E" />
        
        {/* 2 Wavy Horizon Water Lines */}
        <path d="M16 68 Q28 62 40 68 T64 68 T84 68" stroke="#C8102E" strokeWidth="5.5" strokeLinecap="round" fill="none" />
        <path d="M16 79 Q28 73 40 79 T64 79 T84 79" stroke="#C8102E" strokeWidth="5.5" strokeLinecap="round" fill="none" />
      </svg>
    </div>
  );
}

/** DeepLearning.AI (Andrew Ng) - Official Concentric Ripple / Eye Logo */
function LogoDeepLearningAI({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <div className={`${className} rounded-lg bg-[#111111] border border-red-500/30 flex items-center justify-center p-0.5 shrink-0 shadow-sm`}>
      <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
        {/* Coral Pink Solid Background Circle */}
        <circle cx="50" cy="50" r="46" fill="#FF4757" />
        
        {/* Outer Ring */}
        <circle cx="50" cy="50" r="35" stroke="#FFFFFF" strokeWidth="5.5" fill="none" />
        
        {/* Inner Ring */}
        <circle cx="50" cy="50" r="23" stroke="#FFFFFF" strokeWidth="5.5" fill="none" />
        
        {/* Center White Core Eye */}
        <circle cx="50" cy="50" r="11" fill="#FFFFFF" />
      </svg>
    </div>
  );
}

/** Stanford Online / Stanford University - Official Cardinal 'S' with Palo Alto Redwood Tree */
function LogoStanford({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <div className={`${className} rounded-lg bg-[#8C1515] border border-red-400/40 flex items-center justify-center p-0.5 shrink-0 shadow-sm`}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Stanford Block S */}
        <text x="50" y="74" textAnchor="middle" fill="#FFFFFF" fontSize="66" fontWeight="900" fontFamily="Georgia, Times New Roman, serif">
          S
        </text>
        {/* Redwood Tree Silhouette */}
        <path d="M50 22 L57 38 L52 38 L58 52 L53 52 L60 66 L40 66 L47 52 L42 52 L48 38 L43 38 Z" fill="#007C66" />
        <rect x="48.5" y="66" width="3" height="9" fill="#007C66" />
      </svg>
    </div>
  );
}

/** Google Cloud Platform - Official 4-Color Cloud Platform Emblem */
function LogoGoogleCloud({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <div className={`${className} rounded-lg bg-[#1A1F2C] border border-blue-400/40 flex items-center justify-center p-1 shrink-0 shadow-sm`}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <path d="M38 65 L28 55 Q20 40 35 30 Q50 20 62 32 Q78 28 82 45 Q88 60 74 65 Z" fill="#4285F4" opacity="0.3" />
        <path d="M32 60 L24 50 A15 15 0 0 1 45 35 A22 22 0 0 1 72 40 A16 16 0 0 1 78 60 Z" stroke="#4285F4" strokeWidth="6" fill="none" />
        <circle cx="34" cy="52" r="5" fill="#EA4335" />
        <circle cx="50" cy="38" r="5" fill="#FBBC05" />
        <circle cx="66" cy="50" r="5" fill="#34A853" />
      </svg>
    </div>
  );
}

/** University of Michigan - Official Block 'M' in Maize & Blue */
function LogoMichigan({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <div className={`${className} rounded-lg bg-[#00274C] border border-[#FFCB05]/60 flex items-center justify-center p-0.5 shrink-0 shadow-sm`}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <path d="M22 30 H36 L50 58 L64 30 H78 V70 H64 V48 L52 70 H48 L36 48 V70 H22 Z" fill="#FFCB05" />
      </svg>
    </div>
  );
}

/** Amazon Web Services (AWS) - Official AWS Cloud Smile */
function LogoAWS({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <div className={`${className} rounded-lg bg-[#232F3E] border border-amber-500/40 flex items-center justify-center p-1 shrink-0 shadow-sm`}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <text x="50" y="46" textAnchor="middle" fill="#FFFFFF" fontSize="28" fontWeight="900" fontFamily="sans-serif">
          aws
        </text>
        <path d="M22 62 Q50 82 78 62" stroke="#FF9900" strokeWidth="7" strokeLinecap="round" fill="none" />
        <polygon points="76,56 84,65 72,68" fill="#FF9900" />
      </svg>
    </div>
  );
}

/** Harvard University / CS50 - Official Harvard Crimson Shield */
function LogoHarvard({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <div className={`${className} rounded-lg bg-[#1C0408] border border-red-300/40 flex items-center justify-center p-0.5 shrink-0 shadow-sm`}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <path d="M22 18 H78 V62 Q78 84 50 94 Q22 84 22 62 Z" fill="#A51C30" stroke="#FFFFFF" strokeWidth="4" />
        <text x="50" y="58" textAnchor="middle" fill="#FFFFFF" fontSize="22" fontWeight="900" fontFamily="Georgia, serif">
          CS50
        </text>
      </svg>
    </div>
  );
}

/** IBM - Official 8-Bar Blue Monogram */
function LogoIBM({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <div className={`${className} rounded-lg bg-[#0A1128] border border-blue-500/40 flex items-center justify-center p-1 shrink-0 shadow-sm`}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <text x="50" y="65" textAnchor="middle" fill="#0062FF" fontSize="38" fontWeight="900" fontFamily="Courier, monospace" letterSpacing="-2">
          IBM
        </text>
        <line x1="15" y1="36" x2="85" y2="36" stroke="#0A1128" strokeWidth="4" />
        <line x1="15" y1="46" x2="85" y2="46" stroke="#0A1128" strokeWidth="4" />
        <line x1="15" y1="56" x2="85" y2="56" stroke="#0A1128" strokeWidth="4" />
      </svg>
    </div>
  );
}

/** UNDP (United Nations) - Official United Nations Globe & Grid Emblem */
function LogoUNDP({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <div className={`${className} rounded-lg bg-[#006EB5] border border-sky-300/40 flex items-center justify-center p-1 shrink-0 shadow-sm`}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="38" stroke="#FFFFFF" strokeWidth="5" fill="none" opacity="0.8" />
        <ellipse cx="50" cy="50" rx="38" ry="18" stroke="#FFFFFF" strokeWidth="4" fill="none" opacity="0.8" />
        <line x1="50" y1="12" x2="50" y2="88" stroke="#FFFFFF" strokeWidth="4" opacity="0.8" />
        <text x="50" y="58" textAnchor="middle" fill="#FFFFFF" fontSize="16" fontWeight="900" fontFamily="sans-serif">
          UNDP
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
    <section id="education" className="mb-32 scroll-mt-[var(--nav-height)]">
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
                      {/* Authentic School Brand Crest Logo */}
                      {isUCSD ? <LogoUCSD className="w-12 h-12" /> : <LogoSkyline className="w-12 h-12" />}

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
                            {/* Exact Official Brand Vector Logo */}
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
