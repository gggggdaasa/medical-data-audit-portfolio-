import React, { useState } from 'react';
import { motion } from 'motion/react';
import { playHoverSound } from '../utils/audio';

interface RadarData {
  subject: string;
  subjectAr: string;
  value: number; // 0 to 100
  level: string;
  levelAr: string;
}

interface SkillsRadarProps {
  lang: 'en' | 'ar';
  selectedSkill: string | null;
  setSelectedSkill: (skill: string | null) => void;
}

export default function SkillsRadar({ lang, selectedSkill, setSelectedSkill }: SkillsRadarProps) {
  const isRtl = lang === 'ar';

  const handleNodeClick = (subject: string) => {
    let tag = subject;
    // Map radar subject back to exact tag names in projects
    if (subject === 'Excel (Adv)') tag = 'Microsoft Excel';
    
    if (selectedSkill === tag) {
      setSelectedSkill(null);
      playHoverSound('soft');
    } else {
      setSelectedSkill(tag);
      playHoverSound('success');
      
      // Smoothly scroll down to project section
      const projEl = document.getElementById('projects');
      if (projEl) {
        projEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };
  
  // Data for the 6 Core Domains
  const data: RadarData[] = [
    { 
      subject: 'Data Cleaning', 
      subjectAr: 'تنظيف البيانات', 
      value: 95, 
      level: 'Master', 
      levelAr: 'خبير جداً' 
    },
    { 
      subject: 'Python', 
      subjectAr: 'بايثون', 
      value: 90, 
      level: 'Advanced', 
      levelAr: 'متقدم' 
    },
    { 
      subject: 'Excel (Adv)', 
      subjectAr: 'إكسل المتقدم', 
      value: 98, 
      level: 'Master', 
      levelAr: 'خبير جداً' 
    },
    { 
      subject: 'R Language', 
      subjectAr: 'لغة R الإحصائية', 
      value: 80, 
      level: 'Proficient', 
      levelAr: 'متمكن' 
    },
    { 
      subject: 'AI Ethics', 
      subjectAr: 'أخلاقيات الذكاء', 
      value: 90, 
      level: 'Expert', 
      levelAr: 'خبير ذي دراية' 
    },
    { 
      subject: 'MCP Integration', 
      subjectAr: 'بروتوكول MCP', 
      value: 85, 
      level: 'Advanced', 
      levelAr: 'متقدم ملامس' 
    },
  ];

  const totalAxes = data.length;
  const width = 360;
  const height = 360;
  const cx = width / 2;
  const cy = height / 2;
  const maxRadius = 120;

  // Active highlighted index state
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  // Helper to get angle for index
  const getAngle = (i: number) => {
    return (i * 2 * Math.PI) / totalAxes - Math.PI / 2;
  };

  // Concentric levels (e.g. 20%, 40%, 60%, 80%, 100%)
  const gridLevels = [0.2, 0.4, 0.6, 0.8, 1.0];

  // Calculate polygon points for a specific scale (0.0 to 1.0)
  const getGridPoints = (scale: number) => {
    const points: string[] = [];
    for (let i = 0; i < totalAxes; i++) {
      const angle = getAngle(i);
      const r = maxRadius * scale;
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);
      points.push(`${x},${y}`);
    }
    return points.join(' ');
  };

  // Coordinates of the real proficiency vertices
  const skillPoints = data.map((d, i) => {
    const angle = getAngle(i);
    const scale = d.value / 100;
    const r = maxRadius * scale;
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
      labelX: cx + (maxRadius + 26) * Math.cos(angle),
      labelY: cy + (maxRadius + 18) * Math.sin(angle),
      ...d
    };
  });

  // Create point list string for svg polygon
  const skillPointsString = skillPoints.map(p => `${p.x},${p.y}`).join(' ');

  return (
    <div className="w-full flex flex-col items-center select-none" id="radar-chart-container">
      {/* Chart Canvas Card */}
      <div className="relative w-full max-w-[420px] bg-slate-900/60 border border-slate-850 p-6 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.4)] backdrop-blur-md overflow-hidden group">
        
        {/* Subtle Cybernetic grid gradient corners */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-500/35 rounded-tl-xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-500/35 rounded-br-xl pointer-events-none" />

        <div className="text-center mb-1">
          <h4 className="text-[10px] font-mono tracking-widest text-cyan-400 font-bold uppercase">
            {lang === 'en' ? "Skill Spectrum" : "مخطط طيف المهارات"}
          </h4>
          <p className="text-[9px] font-semibold text-slate-500 uppercase tracking-widest mt-0.5 font-mono">
            {lang === 'en' ? "Hover nodes to analyze proficiency" : "مرر مؤشر الماوس فوق النقاط للتحليل الإحصائي"}
          </p>
        </div>

        {/* SVG Wrapper */}
        <div className="relative flex justify-center items-center py-2">
          <svg
            width="100%"
            height="100%"
            viewBox={`0 0 ${width} ${height}`}
            className="w-full h-auto max-w-[340px]"
          >
            {/* Definitions for gorgeous glowing custom gradients */}
            <defs>
              <radialGradient id="meshGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
                <stop offset="70%" stopColor="#3b82f6" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#020617" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="polyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.15" />
              </linearGradient>
            </defs>

            {/* Glowing outer aura behind map */}
            <circle cx={cx} cy={cy} r={maxRadius} fill="url(#meshGrad)" className="pointer-events-none" />

            {/* Inner level polygons (Grid rings) */}
            {gridLevels.map((lvl, idx) => (
              <polygon
                key={idx}
                points={getGridPoints(lvl)}
                fill="none"
                stroke="rgba(51, 65, 85, 0.35)"
                strokeWidth={1}
                strokeDasharray={idx === 4 ? "0" : "3,3"}
              />
            ))}

            {/* Radial axis lines from center */}
            {Array.from({ length: totalAxes }).map((_, i) => {
              const angle = getAngle(i);
              const x = cx + maxRadius * Math.cos(angle);
              const y = cy + maxRadius * Math.sin(angle);
              return (
                <line
                  key={i}
                  x1={cx}
                  y1={cy}
                  x2={x}
                  y2={y}
                  stroke="rgba(51, 65, 85, 0.45)"
                  strokeWidth={1}
                />
              );
            })}

            {/* Primary Skill area polygon */}
            <motion.polygon
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              points={skillPointsString}
              fill="url(#polyGrad)"
              stroke="#06b6d4"
              strokeWidth={2}
              className="drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]"
            />

            {/* Interactive Nodes */}
            {skillPoints.map((pt, i) => {
              const isHovered = activeIdx === i;
              const isExcelSubject = pt.subject === 'Excel (Adv)';
              const isAISubject = pt.subject === 'AI Ethics';
              const isMCPSubject = pt.subject === 'MCP Integration';
              let correspondingTag = pt.subject;
              if (isExcelSubject) correspondingTag = 'Microsoft Excel';
              else if (isAISubject) correspondingTag = 'AI Ethics';
              else if (isMCPSubject) correspondingTag = 'MCP Integration';

              const isActive = selectedSkill === correspondingTag;

              return (
                <g 
                  key={i} 
                  className="cursor-pointer focus:outline-none"
                  onClick={() => handleNodeClick(pt.subject)}
                >
                  {/* Invisible larger hover trigger area */}
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={18}
                    fill="transparent"
                    onMouseEnter={() => {
                      setActiveIdx(i);
                      playHoverSound('soft');
                    }}
                    onMouseLeave={() => setActiveIdx(null)}
                  />
                  
                  {/* Glowing halo indicator on hover or active */}
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={isHovered || isActive ? 9 : 4.5}
                    fill={isHovered || isActive ? "rgba(6, 182, 212, 0.45)" : "#1e293b"}
                    stroke={isActive ? "#06b6d4" : isHovered ? "#3b82f6" : "#06b6d4"}
                    strokeWidth={isActive ? 2.5 : 1.5}
                    className="transition-all duration-200"
                  />
                  
                  {/* Core neon point */}
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={2.5}
                    fill={isHovered || isActive ? "#22d3ee" : "#06b6d4"}
                    className="transition-colors duration-200"
                  />

                  {/* Skill text labels */}
                  <text
                    x={pt.labelX}
                    y={pt.labelY}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={isActive ? "#22d3ee" : isHovered ? "#22d3ee" : "#94a3b8"}
                    className={`text-[10px] font-space font-extrabold tracking-tight transition-colors duration-200 ${isActive ? 'font-black drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]' : ''}`}
                  >
                    {lang === 'en' ? pt.subject : pt.subjectAr}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Dynamic Live Info Display */}
        <div className="mt-2 h-14 bg-slate-950/80 border border-slate-900 rounded-2xl flex items-center justify-between px-5 relative overflow-hidden transition-all duration-200">
          {activeIdx !== null ? (
            <>
              {/* Hot holographic bar */}
              <div className="absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b from-cyan-400 to-blue-500 animate-pulse" />
              <div className="min-w-0">
                <span className="text-[9px] font-mono font-bold tracking-widest text-slate-550 uppercase">
                  {lang === 'en' ? "ACTIVE SPECTRUM ANALYTICS" : "تحليلات الطيف النشطة"}
                </span>
                <p className="text-xs font-black text-white truncate">
                  {lang === 'en' ? data[activeIdx].subject : data[activeIdx].subjectAr}
                </p>
              </div>
              <div className="text-right">
                <span className="text-sm font-black text-cyan-400 font-mono">
                  {data[activeIdx].value}%
                </span>
                <p className="text-[9px] font-bold text-emerald-400 uppercase tracking-wider font-mono">
                  {lang === 'en' ? data[activeIdx].level : data[activeIdx].levelAr}
                </p>
              </div>
            </>
          ) : (
            <div className="w-full text-center py-2 text-slate-500 flex items-center justify-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-700 animate-ping shrink-0" />
              <span className="text-[10px] font-mono font-bold tracking-widest uppercase">
                {lang === 'en' ? "CALIBRATED METRICS ONLINE" : "تم ضبط ومعايرة أنظمة القياس والبحث"}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
