import React, { useState } from 'react';
import { portfolioData } from './data';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import DataPlayground from './components/DataPlayground';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import { Database, ShieldCheck } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState<'en' | 'ar'>('en');
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const dict = portfolioData[lang];
  const isRtl = lang === 'ar';

  return (
    <div className={`min-h-screen bg-[#030712] text-slate-100 ${isRtl ? 'rtl' : 'ltr'}`} style={{ direction: isRtl ? 'rtl' : 'ltr' }}>
      {/* Dynamic Header */}
      <Header lang={lang} setLang={setLang} dict={dict} />

      {/* Main Blocks */}
      <main>
        {/* Hero Section */}
        <Hero lang={lang} dict={dict} />

        {/* About Section */}
        <About lang={lang} dict={dict} />

        {/* Skills Section */}
        <Skills 
          lang={lang} 
          dict={dict} 
          selectedSkill={selectedSkill} 
          setSelectedSkill={setSelectedSkill} 
        />

        {/* Interactive Lab Section */}
        <section id="playground" className="py-24 bg-[#080d1a] border-b border-slate-900 scroll-mt-12">
          <div className="max-w-4xl mx-auto px-4">
            <DataPlayground lang={lang} dict={dict} />
          </div>
        </section>

        {/* Projects Section */}
        <Projects 
          lang={lang} 
          dict={dict} 
          selectedSkill={selectedSkill} 
          setSelectedSkill={setSelectedSkill} 
        />

        {/* Education & Achievements Section */}
        <Education lang={lang} dict={dict} />

        {/* Contact Form Section */}
        <Contact lang={lang} dict={dict} />
      </main>

      {/* Modern High Quality Footer */}
      <footer className="bg-[#030712] text-slate-500 py-16 border-t border-slate-900">
        <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-blue-500/10">
              <Database className="w-5 h-5 text-white" />
            </div>
            <div className={`font-space font-black text-xs text-white flex flex-col items-start leading-none ${isRtl ? 'md:items-end' : 'md:items-start'}`}>
              <span>Mustafa Mahmoud Ali</span>
              <span className="text-[9px] font-mono tracking-widest text-cyan-400 mt-1 uppercase">
                {lang === 'en' ? "Data Integrity Engineer" : "مهندس جودة وإحصاء بيانات"}
              </span>
            </div>
          </div>

          <div className="text-[11px] leading-relaxed">
            <p className="text-slate-400 font-medium">
              {lang === 'en'
                ? "© 2026 Mustafa Mahmoud Ali · Giza, Egypt"
                : "© 2026 مصطفى محمود علي · الجيزة، جمهورية مصر العربية"}
            </p>
            <p className="text-slate-600 mt-1.5 font-mono text-[10px]">
              {lang === 'en' ? "Crafted cleanly in React 19 & Tailwind v4 · 3D Powered" : "تم البناء وتطوير الواجهة بـ React 19 و Tailwind v4 · مدعوم بـ 3D"}
            </p>
          </div>

          <div className="flex gap-2.5 text-[10px] items-center text-slate-405 bg-slate-900/60 border border-slate-800 p-2.5 rounded-2xl pointer-events-none">
            <ShieldCheck className="w-4 h-4 text-emerald-450 text-cyan-400" />
            <span className="font-bold text-slate-300">{lang === 'en' ? "100% Validated Gold data" : "بيانات مطابقة تماماً ومعتمدة"}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
