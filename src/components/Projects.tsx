import React, { useState } from 'react';
import { FolderGit2, Github, ExternalLink, BadgeInfo, CheckCircle, Search, X } from 'lucide-react';
import { Project } from '../data';
import TiltWrapper from './TiltWrapper';
import { playHoverSound } from '../utils/audio';

interface ProjectsProps {
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

export default function Projects({ lang, dict, selectedSkill, setSelectedSkill }: ProjectsProps) {
  const isRtl = lang === 'ar';
  const pr = dict.projects;
  const projectList: Project[] = pr.list;

  const [searchQuery, setSearchQuery] = useState('');

  // Combined filtering: apply both selected skill filter AND search query keyword filter
  const filteredProjects = projectList.filter((project) => {
    // 1. Skill tagging filter
    if (selectedSkill) {
      const hasSkill = project.tags.some(
        (tag) => normalizeSkill(tag) === selectedSkill
      );
      if (!hasSkill) return false;
    }

    // 2. Text keyword search query filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      const matchTitle = project.title.toLowerCase().includes(query);
      const matchDescription = project.description.toLowerCase().includes(query);
      const matchSubtitle = project.subtitle.toLowerCase().includes(query);
      const matchTag = project.tags.some((tag) => tag.toLowerCase().includes(query));
      const matchFeature = project.features.some((feat) => feat.toLowerCase().includes(query));

      return matchTitle || matchDescription || matchSubtitle || matchTag || matchFeature;
    }

    return true;
  });

  const searchPlaceholder = lang === 'en'
    ? "Search projects by title, description or tech parameters..."
    : "ابحث في المشاريع بالعناوين، الأوصاف، أو الكلمات المفتاحية...";

  return (
    <section id="projects" className="py-24 bg-[#080d1a] border-b border-slate-900 scroll-mt-12 relative overflow-hidden">
      {/* Decorative vertical lines */}
      <div className="absolute top-0 left-1/5 w-[1px] h-full bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">{pr.title}</span>
          <h2 className="font-space text-2xl sm:text-4xl font-black text-white mt-2 tracking-tight section-title-3d">
            {pr.subtitle}
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-blue-600 to-cyan-400 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Elegant Search Input Bar */}
        <div className="mb-10 max-w-lg mx-auto">
          <div className="relative group">
            <div className={`absolute inset-y-0 flex items-center pointer-events-none text-slate-500 transition-colors group-focus-within:text-cyan-400 ${
              isRtl ? 'right-4' : 'left-4'
            }`}>
              <Search className="w-4 h-4 text-cyan-500/80" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
              placeholder={searchPlaceholder}
              className={`w-full py-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.5)] transition-all ${
                isRtl ? 'pr-12 pl-12 text-right' : 'pl-12 pr-12'
              }`}
              style={{ direction: isRtl ? 'rtl' : 'ltr' }}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  playHoverSound('soft');
                }}
                className={`absolute inset-y-0 flex items-center justify-center p-1.5 focus:outline-none text-slate-400 hover:text-white transition-colors ${
                  isRtl ? 'left-4' : 'right-4'
                }`}
                title={lang === 'en' ? "Clear search" : "مسح البحث"}
              >
                <X className="w-4 h-4 bg-slate-800 rounded-full p-0.5 hover:bg-slate-700" />
              </button>
            )}
          </div>
        </div>

        {/* Active Filter and Search Indicators */}
        {(selectedSkill || searchQuery) && (
          <div className="mb-10 p-4 rounded-2xl bg-cyan-950/15 border border-cyan-800/20 flex flex-col md:flex-row items-center justify-between gap-4 animate-fadeIn">
            <div className={`flex flex-wrap items-center gap-2.5 ${isRtl ? 'flex-row-reverse' : ''}`}>
              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse flex-shrink-0" />
              <span className="text-xs font-semibold text-slate-300">
                {lang === 'en' ? "Active filters:" : "المرشحات النشطة:"}
              </span>
              
              {selectedSkill && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-cyan-950/45 border border-cyan-500/40 rounded-xl text-[10px] font-mono font-bold text-cyan-300">
                  <span>{lang === 'en' ? 'Skill' : 'المهارة'}: {selectedSkill}</span>
                  <button 
                    onClick={() => {
                      setSelectedSkill(null);
                      playHoverSound('soft');
                    }}
                    className="hover:text-white ml-1 cursor-pointer font-sans"
                    title={lang === 'en' ? "Clear skill filter" : "حذف فلتر المهارة"}
                  >
                    ✕
                  </button>
                </span>
              )}

              {searchQuery && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-950/45 border border-blue-500/40 rounded-xl text-[10px] font-mono font-bold text-blue-300">
                  <span>{lang === 'en' ? 'Keyword' : 'الكلمة'}: "{searchQuery}"</span>
                  <button 
                    onClick={() => {
                      setSearchQuery('');
                      playHoverSound('soft');
                    }}
                    className="hover:text-white ml-1 cursor-pointer font-sans"
                    title={lang === 'en' ? "Clear search filter" : "حذف فلتر البحث"}
                  >
                    ✕
                  </button>
                </span>
              )}

              <span className="text-[10px] font-mono text-slate-500 ml-1">
                ({filteredProjects.length} {lang === 'en' ? (filteredProjects.length === 1 ? 'project' : 'projects') : 'مشاريع'})
              </span>
            </div>

            <button
              onClick={() => {
                setSelectedSkill(null);
                setSearchQuery('');
                playHoverSound('soft');
              }}
              className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-[10px] font-mono font-bold text-slate-400 hover:text-white hover:border-cyan-500/40 hover:bg-slate-850 cursor-pointer transition-all active:scale-95 flex items-center gap-1.5"
            >
              <span>✕</span>
              <span>{lang === 'en' ? "Clear All" : "إلغاء التصفية"}</span>
            </button>
          </div>
        )}

        {/* Project Card */}
        <div className="space-y-12">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, idx) => (
              <div
                key={idx}
                onMouseEnter={() => playHoverSound('pluck')}
                className="bg-slate-900/80 border border-slate-850 rounded-3xl overflow-hidden shadow-2xl transition-all hover:border-cyan-500/15"
              >
                {/* Header block */}
                <div className="bg-[#0b1324] p-6 sm:p-8 border-b border-slate-800/60 flex flex-col sm:flex-row justify-between items-start gap-4 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-[40px] pointer-events-none" />
                  
                  <div className="flex gap-4 items-start relative z-10">
                    <div className="p-3 bg-cyan-950/45 text-cyan-400 rounded-2xl border border-cyan-800/35 flex-shrink-0 animate-pulse">
                      <FolderGit2 className="w-6 h-6" />
                    </div>
                    <div className={isRtl ? 'text-right' : 'text-left'}>
                      <span className="text-[10px] font-mono tracking-widest text-cyan-400 font-bold uppercase">
                        {project.subtitle}
                      </span>
                      <h3 className="font-space font-black text-lg sm:text-2xl mt-1 leading-tight tracking-tight text-white">
                        {project.title}
                      </h3>
                    </div>
                  </div>

                  <div className="px-3 py-1.5 bg-slate-900 rounded-xl text-[10px] font-mono border border-slate-800 uppercase tracking-widest text-slate-400 text-cyan-400/80 relative z-10">
                    {dict.projects.kit}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-8 space-y-8">
                  <p className={`text-xs sm:text-sm text-slate-300 leading-relaxed font-semibold ${isRtl ? 'text-right' : 'text-left'}`}>
                    {project.description}
                  </p>

                  {/* Applied processes */}
                  <div className="space-y-4 bg-slate-950 rounded-2xl p-5 sm:p-6 border border-slate-900">
                    <h4 className={`text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
                      <BadgeInfo className="w-4 h-4 text-cyan-500" />
                      {lang === 'en' ? "Architecture & Strategies applied" : "المنهجيات والمعادلات الإحصائية المطبقة"}
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-3">
                      {project.features.map((feat, fIdx) => (
                        <li key={fIdx} className={`flex gap-2.5 items-start text-xs text-slate-350 ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}>
                          <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Raw performance results (statistics with Tilt physics) */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {project.stats.map((stat, sIdx) => (
                      <TiltWrapper key={sIdx} maxRotation={15}>
                        <div 
                          onMouseEnter={(e) => {
                            e.stopPropagation(); // prevent card parent 'pluck' sound from firing together
                            playHoverSound('soft');
                          }}
                          className="bg-slate-950 border border-slate-900/80 p-4 rounded-2xl text-center hover:border-cyan-500/35 transition-colors group"
                        >
                          <div className="text-lg sm:text-xl font-black text-cyan-400 font-mono tracking-tight number-3d">
                            {stat.value}
                          </div>
                          <div className="text-[8px] font-mono uppercase tracking-widest text-slate-500 mt-1 font-bold">
                            {stat.label}
                          </div>
                        </div>
                      </TiltWrapper>
                    ))}
                  </div>
                </div>

                {/* Card Footer links */}
                <div className="px-6 py-5 bg-slate-950 border-t border-slate-900/60 flex flex-wrap gap-4 items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tIdx) => {
                      const tagNormalized = normalizeSkill(tag);
                      const isTagActive = selectedSkill === tagNormalized;
                      return (
                        <button
                          key={tIdx}
                          onClick={() => {
                            if (isTagActive) {
                              setSelectedSkill(null);
                              playHoverSound('soft');
                            } else {
                              setSelectedSkill(tagNormalized);
                              playHoverSound('pluck');
                            }
                          }}
                          className={`px-2.5 py-1 text-[9px] font-mono uppercase font-black tracking-widest rounded-lg border transition-all cursor-pointer ${
                            isTagActive
                              ? "bg-cyan-950/60 border-cyan-500 text-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.25)] font-extrabold"
                              : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-300 hover:border-slate-700 hover:bg-slate-850"
                          }`}
                        >
                          {tag}
                        </button>
                      );
                    })}
                  </div>

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="px-4 py-2.5 bg-slate-900 hover:bg-cyan-950/20 text-slate-200 hover:text-cyan-400 font-black text-xs rounded-xl transition-all flex items-center gap-2 border border-slate-800 hover:border-cyan-500/35"
                  >
                    <Github className="w-4 h-4 text-cyan-400" />
                    <span>{lang === 'en' ? "Source Repository" : "مستودع الكود برمجياً"}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-slate-900/40 border border-slate-850 rounded-2xl flex flex-col items-center justify-center p-6 space-y-4">
              <span className="text-4xl">🔍</span>
              <div>
                <p className="text-sm font-bold text-slate-300">
                  {lang === 'en' ? "No matching projects found" : "لم يتم العثور على أي مشاريع مطابقة"}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  {lang === 'en' ? "Try clearing search keywords or selecting a different skill parameter above." : "يرجى تجربة تفريغ كلمات البحث أو تحديد معامل مهارة آخر من الأعلى."}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelectedSkill(null);
                  setSearchQuery('');
                  playHoverSound('soft');
                }}
                className="px-4 py-1.5 rounded-xl bg-cyan-600/10 hover:bg-cyan-600/20 text-cyan-400 border border-cyan-800/30 text-xs font-semibold cursor-pointer active:scale-95 transition-all"
              >
                {lang === 'en' ? "Clear all filters" : "إلغاء التصفية وإظهار الجميع"}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
