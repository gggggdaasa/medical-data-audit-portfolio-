import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Play, Server, FileSpreadsheet, Percent, ShieldCheck } from 'lucide-react';
import ThreeDOrbit from './ThreeDOrbit';
import TiltWrapper from './TiltWrapper';
import ThreeDBackground from './ThreeDBackground';

interface HeroProps {
  lang: 'en' | 'ar';
  dict: any;
}

export default function Hero({ lang, dict }: HeroProps) {
  const isRtl = lang === 'ar';
  const hText = dict.hero;

  const statIcons = [
    <FileSpreadsheet className="w-5 h-5 text-emerald-400" />,
    <Server className="w-5 h-5 text-cyan-400" />,
    <Percent className="w-5 h-5 text-amber-400" />,
    <ShieldCheck className="w-5 h-5 text-blue-400" />
  ];

  return (
    <section id="top" className="relative min-h-screen pt-28 pb-16 flex items-center justify-center bg-[#030712] overflow-hidden border-b border-slate-900">
      {/* Immersive 3D grid, mesh background patterns & glowing orbits */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-40"></div>
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[140px] animate-pulse"></div>
        <div className="absolute top-1/2 -left-40 w-[450px] h-[450px] bg-cyan-500/5 rounded-full blur-[120px] animate-pulse"></div>
        <ThreeDBackground />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full">
        {/* Desktop Split Bento-Style Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Column 1: Volumetric Text & Actions (span 7) */}
          <div className={`col-span-1 lg:col-span-7 ${isRtl ? 'text-right' : 'text-left'} space-y-6`}>
            
            {/* Available Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-950/40 border border-cyan-800/40 text-cyan-400 text-xs font-semibold rounded-full shadow-sm shadow-cyan-950/20"
            >
              <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping"></span>
              <span>{hText.badge}</span>
            </motion.div>

            {/* Name with deep 3D style */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="space-y-1"
            >
              <span className="text-gradient uppercase tracking-widest font-mono text-xs sm:text-sm font-bold block">
                {hText.tagline}
              </span>
              <h1 className="font-space text-4xl sm:text-6xl font-black text-white leading-tight tracking-tight text-3d-glow cursor-pointer">
                {hText.headline}
              </h1>
            </motion.div>

            {/* Sub-headline description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl font-medium"
            >
              {hText.subHeadline}
            </motion.p>

            {/* Actions triggers */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className={`flex flex-wrap gap-4 ${isRtl ? 'justify-start' : 'justify-start'}`}
            >
              <a
                href="#playground"
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs rounded-xl shadow-md shadow-cyan-500/10 flex items-center gap-2.5 transition-transform hover:-translate-y-0.5 border border-cyan-400/20"
              >
                <Play className="w-4 h-4 fill-white text-white" />
                <span>{hText.actions.lab}</span>
              </a>
              <a
                href="#projects"
                className="px-6 py-3 bg-slate-900 hover:bg-slate-850 text-slate-300 font-bold text-xs rounded-xl border border-slate-800 shadow-sm flex items-center gap-1.5 transition-all"
              >
                <span>{hText.actions.projects}</span>
                <ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
              </a>
            </motion.div>
          </div>

          {/* Column 2: Interactive 3D Orbit Atom (span 5) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="col-span-1 lg:col-span-5 flex justify-center w-full"
          >
            <div className="w-full max-w-[340px]">
              <ThreeDOrbit lang={lang} />
            </div>
          </motion.div>
        </div>

        {/* 3D Bento Statistics Section (underlying with tilt hooks) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.7 }}
          className="mt-20 border-t border-slate-900 pt-12"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {hText.stats.map((stat: any, index: number) => (
              <TiltWrapper key={index} maxRotation={12} className="h-full">
                <div className="h-full bg-slate-900/60 hover:bg-slate-900/90 border border-slate-850 hover:border-cyan-500/40 p-5 rounded-2xl transition-colors text-center flex flex-col items-center justify-between gap-3 group stat-item-hover">
                  <div className="p-2.5 bg-slate-800 rounded-xl group-hover:bg-blue-950/50 transition-colors">
                    {statIcons[index]}
                  </div>

                  <div className="space-y-1">
                    <div className="font-space text-2xl sm:text-3xl font-black text-white tracking-tight number-3d">
                      {stat.value}
                    </div>
                    <div className="text-[9px] font-mono uppercase tracking-widest text-slate-500 font-bold">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </TiltWrapper>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
