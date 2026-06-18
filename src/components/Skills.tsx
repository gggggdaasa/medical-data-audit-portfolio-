import React from 'react';
import { Settings, RefreshCw, BarChart2 } from 'lucide-react';
import { SkillCategory } from '../data';
import SkillsRadar from './SkillsRadar';
import { playHoverSound } from '../utils/audio';

interface SkillsProps {
  lang: 'en' | 'ar';
  dict: any;
  selectedSkill: string | null;
  setSelectedSkill: (skill: string | null) => void;
}

const normalizeSkill = (s: string): string => {
  const lower = s.toLowerCase();
  if (lower.includes("excel") || lower.includes("إكسل")) return "Microsoft Excel";
  if (lower.includes("python") || lower.includes("بايثون")) return "Python";
  if (lower.includes("r language") || lower.includes("لغة r") || lower.includes("لغة r الإحصائية")) return "R Language";
  if (lower.includes("github")) return "GitHub";
  if (lower.includes("sql")) return "SQL";
  if (lower.includes("mcp") || lower.includes("بروتوكول")) {
    if (lower.includes("integration") || lower.includes("تكامل")) return "MCP Integration";
    return "MCP (Model Context Protocol)";
  }
  if (lower.includes("pandas")) return "pandas";
  if (lower.includes("openpyxl")) return "openpyxl";
  if (lower.includes("seaborn")) return "Seaborn";
  if (lower.includes("matplotlib")) return "Matplotlib";
  if (lower.includes("dplyr")) return "dplyr (R)";
  if (lower.includes("ggplot")) return "ggplot2 (R)";
  if (lower.includes("cleaning") || lower.includes("تنظيف")) return "Data Cleaning";
  if (lower.includes("ethics") || lower.includes("أخلاقيات")) return "AI Ethics";
  if (lower.includes("imputation") || lower.includes("التعويض")) return "Strategic Imputation";
  if (lower.includes("date") || lower.includes("التواريخ") || lower.includes("iso")) return "Date Standardization";
  if (lower.includes("duplicate") || lower.includes("المعرفات") || lower.includes("تدقيق")) return "Duplicate Auditing";
  return s;
};

export default function Skills({ lang, dict, selectedSkill, setSelectedSkill }: SkillsProps) {
  const isRtl = lang === 'ar';
  const sk = dict.skills;

  const categories: SkillCategory[] = sk.categories;

  // Header Icons mapped index-wise
  const categoryHeaderIcons = [
    <Settings className="w-5 h-5 text-blue-400" />,
    <RefreshCw className="w-5 h-5 text-cyan-400" />,
    <BarChart2 className="w-5 h-5 text-emerald-400" />
  ];

  return (
    <section id="skills" className="py-24 bg-[#030712] border-b border-slate-900 scroll-mt-12 relative overflow-hidden">
      {/* Decorative linear light bars */}
      <div className="absolute top-0 right-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-blue-500/10 to-transparent" />

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">{sk.title}</span>
          <h2 className="font-space text-2xl sm:text-4xl font-black text-white mt-2 tracking-tight section-title-3d">
            {sk.subtitle}
          </h2>
          <p className="text-[10px] font-bold text-slate-550 mt-2 uppercase tracking-widest font-mono text-cyan-500/60 flex items-center justify-center gap-1.5 animate-pulse">
            <span>✨</span> {sk.hoverTip} <span>✨</span>
          </p>
          <div className="w-12 h-1 bg-gradient-to-r from-blue-600 to-cyan-400 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Skill Spectrum Radar Chart */}
        <div className="flex justify-center mb-16">
          <SkillsRadar 
            lang={lang} 
            selectedSkill={selectedSkill} 
            setSelectedSkill={setSelectedSkill} 
          />
        </div>

        {/* 3D Flip Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="group h-[250px] perspective-1000 cursor-pointer"
            >
              <div className="relative w-full h-full transition-transform duration-700 preserve-3d group-hover:[transform:rotateY(180deg)]">
                
                {/* Face A (Front): Dark Glassmorphism card */}
                <div className="absolute inset-0 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl hover:shadow-cyan-500/5 transition-all flex flex-col justify-between backface-hidden">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="p-3 bg-slate-850 text-xl rounded-2xl border border-slate-800">
                        {cat.icon}
                      </div>
                      <div className="p-1 px-3 bg-cyan-950/40 text-[10px] font-mono tracking-widest uppercase text-cyan-400 rounded-lg border border-cyan-800/25">
                        {lang === 'en' ? "Standard" : "أساسي"}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-space font-extrabold text-sm sm:text-base text-white leading-tight tracking-tight">
                        {cat.title}
                      </h3>
                      <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest font-mono mt-1.5 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                        {lang === 'en' ? "FLIP TO EXPLORE" : "أدر البطاقة للاكتشاف"}
                      </p>
                    </div>
                  </div>

                  {/* Skills tags list - relative z-20 to ensure it gets the click actions over group hover */}
                  <div className="flex flex-wrap gap-1.5 pt-2 relative z-20">
                    {cat.skills.map((skill, sIdx) => {
                      const isLearning = skill.toLowerCase().includes("learning") || skill.toLowerCase().includes("تعلم");
                      const skillTag = normalizeSkill(skill);
                      const isSkillActive = selectedSkill === skillTag;

                      return (
                        <button
                          key={sIdx}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (isSkillActive) {
                              setSelectedSkill(null);
                              playHoverSound('soft');
                            } else {
                              setSelectedSkill(skillTag);
                              playHoverSound('pluck');
                              
                              // Scroll down to projects section immediately
                              const projEl = document.getElementById('projects');
                              if (projEl) {
                                projEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                              }
                            }
                          }}
                          className={`text-[9px] font-bold px-2 py-0.5 rounded-lg border tracking-tight transition-all duration-150 cursor-pointer hover:scale-105 active:scale-95 ${
                            isSkillActive
                              ? "bg-cyan-950/60 border-cyan-500 text-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.3)] font-extrabold"
                              : isLearning
                              ? "bg-amber-950/20 text-amber-400 border-amber-800/30 hover:border-amber-600/50"
                              : "bg-slate-850 text-slate-300 border-slate-800 hover:border-slate-600 hover:text-white"
                          }`}
                          title={lang === 'en' ? `Filter projects by "${skillTag}"` : `تصفية المشاريع بـ "${skillTag}"`}
                        >
                          {skill}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Face B (Back): Neon Holographic glowing card */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-[#0a0f1d] to-[#041a2e] text-white rounded-3xl p-6 text-center flex flex-col justify-center items-center rotate-y-180 backface-hidden border border-cyan-500/30 shadow-[0_0_25px_rgba(6,182,212,0.1)]">
                  {/* Glowing back core indicator */}
                  <div className="absolute -inset-1 bg-cyan-500/5 rounded-3xl blur-md pointer-events-none" />
                  
                  <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase mb-3 font-bold block bg-cyan-950/40 border border-cyan-800/20 px-3 py-0.5 rounded-full z-10">
                    {lang === 'en' ? "Operational Standard" : "معيار الجودة والنزاهة"}
                  </span>
                  
                  <p className="text-xs text-slate-300 leading-relaxed font-semibold px-2 z-10">
                    {cat.description}
                  </p>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
