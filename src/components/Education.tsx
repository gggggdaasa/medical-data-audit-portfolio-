import React from 'react';
import { GraduationCap, Award, Star, Sparkles } from 'lucide-react';
import { EducationEntry, CoursePlatform } from '../data';
import TiltWrapper from './TiltWrapper';

interface EducationProps {
  lang: 'en' | 'ar';
  dict: any;
}

export default function Education({ lang, dict }: EducationProps) {
  const isRtl = lang === 'ar';
  const ed = dict.education;

  const timeline: EducationEntry[] = ed.timeline;
  const platforms: CoursePlatform[] = ed.platforms;

  return (
    <section id="education" className="py-24 bg-[#030712] border-b border-slate-900 scroll-mt-12 relative overflow-hidden">
      {/* Background neon radial glows */}
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/5 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        {/* Academic Timeline Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">{ed.title}</span>
          <h2 className="font-space text-2xl sm:text-4xl font-black text-white mt-2 tracking-tight section-title-3d">
            {ed.subtitle}
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-blue-600 to-cyan-400 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Timeline Grid */}
        <div className="relative pl-6 sm:pl-10 border-l-2 border-slate-800/80 space-y-8 mb-20">
          {timeline.map((entry, index) => (
            <div key={index} className="relative group">
              {/* Timeline circle badge */}
              <div className="absolute -left-[35px] sm:-left-[47px] top-1.5 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-slate-900 text-cyan-400 border-2 border-slate-800 flex items-center justify-center shadow-md group-hover:bg-cyan-500 group-hover:text-slate-950 group-hover:border-cyan-400 transition-all duration-300">
                <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>

              {/* Box */}
              <div className="bg-slate-900/80 border border-slate-850 hover:border-cyan-505 p-6 rounded-2xl shadow-xl transition-all space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <h3 className="font-space font-black text-sm sm:text-lg text-white leading-tight">
                    {entry.institution}
                  </h3>
                  <span className="px-3.5 py-1 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-mono text-[10px] font-bold rounded-xl uppercase tracking-widest shadow-sm self-start sm:self-center">
                    {entry.year}
                  </span>
                </div>

                <div className="text-xs font-bold text-cyan-400 uppercase tracking-widest font-mono">
                  {entry.degree}
                </div>

                <p className="text-xs sm:text-sm text-slate-350 leading-relaxed font-semibold">
                  {entry.description}
                </p>

                <span className="inline-block bg-slate-950 border border-slate-800 text-slate-400 text-[10px] font-mono tracking-widest uppercase font-black px-3 py-1 rounded-lg">
                  {entry.badge}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Certifications Header */}
        <div className="border-t border-slate-900 pt-20">
          <div className="text-center mb-16">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#06b6d4]">{lang === 'en' ? "Verified Achievements" : "الاعتمادات الموثقة وفترات التعلم"}</span>
            <h2 className="font-space text-xl sm:text-3xl font-black text-white mt-2 tracking-tight section-title-3d">
              {ed.certTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {platforms.map((plat, pIdx) => (
              <TiltWrapper key={pIdx} maxRotation={15}>
                <div
                  className="h-full bg-slate-900/80 border border-slate-850 rounded-2xl p-6 shadow-xl flex flex-col justify-between space-y-5 hover:border-cyan-500/20 transition-all group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <span className="text-xs sm:text-sm font-space font-black text-white flex items-center gap-2">
                        <Award className="w-4 h-4 text-amber-400" />
                        {plat.platform}
                      </span>
                      <span className="text-[9px] font-mono tracking-widest text-cyan-400 font-bold uppercase px-2.5 py-0.5 bg-cyan-950/40 rounded-full border border-cyan-800/25">
                        {plat.countLabel}
                      </span>
                    </div>

                    <ul className="space-y-3.5">
                      {plat.courses.map((course, cIdx) => (
                        <li key={cIdx} className="flex gap-2 items-start text-xs text-slate-350">
                          {course.learning ? (
                            <Sparkles className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5 animate-pulse" />
                          ) : (
                            <Star className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                          )}
                          <span className={course.learning ? "text-amber-300 font-bold" : "font-semibold"}>{course.name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="text-[8px] font-mono uppercase tracking-widest text-slate-550 group-hover:text-cyan-400 transition-colors pt-2 border-t border-slate-850/40">
                    {lang === 'en' ? "Verified Credentials" : "اعتمادات متكاملة ومستمرة"}
                  </div>
                </div>
              </TiltWrapper>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
