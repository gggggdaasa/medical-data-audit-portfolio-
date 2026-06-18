import React from 'react';
import { Globe, Database } from 'lucide-react';

interface HeaderProps {
  lang: 'en' | 'ar';
  setLang: (lang: 'en' | 'ar') => void;
  dict: any;
}

export default function Header({ lang, setLang, dict }: HeaderProps) {
  const navItems = [
    { id: 'about', label: dict.nav.about },
    { id: 'skills', label: dict.nav.skills },
    { id: 'playground', label: dict.nav.playground },
    { id: 'projects', label: dict.nav.projects },
    { id: 'education', label: dict.nav.education },
    { id: 'contact', label: dict.nav.contact }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/85 backdrop-blur-xl border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-blue-500/10">
            <Database className="w-5 h-5 text-white" />
          </div>
          <a href="#top" className="font-space font-black text-white tracking-tight text-sm sm:text-base flex flex-col items-start leading-none gap-0.5">
            <span>Mustafa M. Ali</span>
            <span className="text-[9px] font-mono font-bold tracking-widest text-cyan-450 uppercase text-cyan-400">DATA ANALYST</span>
          </a>
        </div>

        {/* Navigation Items - Horizontal on desktop */}
        <nav className="hidden md:flex items-center gap-1.5">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-900 px-3 py-2 rounded-xl transition-all"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Language Switcher */}
          <button
            onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-900 transition-all text-xs font-black text-slate-200"
          >
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span>{lang === 'en' ? 'العربية' : 'English'}</span>
          </button>

          {/* Quick Hire trigger */}
          <a
            href="#contact"
            className="px-4 py-1.5 text-xs font-black bg-cyan-500 hover:bg-cyan-455 text-slate-950 rounded-xl transition shadow-md shadow-cyan-500/10"
          >
            {lang === 'en' ? "Hire Me" : "وظفني"}
          </a>
        </div>
      </div>
    </header>
  );
}
