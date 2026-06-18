import React, { useRef, useEffect, useState } from 'react';
import { Sparkles, HelpCircle, Activity } from 'lucide-react';

interface Node3D {
  x3d: number;
  y3d: number;
  z3d: number;
  color: string;
  size: number;
  type: 'raw' | 'clean' | 'fixed';
}

export default function ThreeDOrbit({ lang }: { lang: 'en' | 'ar' }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCount, setActiveCount] = useState(45);
  const [isRotating, setIsRotating] = useState(true);
  const [dragState, setDragState] = useState({ isDragging: false, startX: 0, startY: 0 });
  const [angleX, setAngleX] = useState(0.005); // automatic spin step
  const [angleY, setAngleY] = useState(0.008);
  const [selectedPreset, setSelectedPreset] = useState<'all' | 'clean' | 'dirty'>('all');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = 310;
    let height = 310;
    let currentAngleX = 0;
    let currentAngleY = 0;

    const resizeCanvas = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        width = Math.min(rect.width, 340);
        height = width;
        canvas.width = width * window.devicePixelRatio;
        canvas.height = height * window.devicePixelRatio;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      }
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Generate 3D point cloud arranged in spherical shell + rings
    const nodes: Node3D[] = [];
    const sphereRadius = 100;

    // Outer spherical point cluster
    for (let i = 0; i < 40; i++) {
      const theta = Math.acos(Math.random() * 2 - 1);
      const phi = Math.random() * Math.PI * 2;
      const r = sphereRadius * (0.8 + Math.random() * 0.3); // Spherical cluster depth
      
      const isClean = Math.random() > 0.4;
      nodes.push({
        x3d: r * Math.sin(theta) * Math.cos(phi),
        y3d: r * Math.sin(theta) * Math.sin(phi),
        z3d: r * Math.cos(theta),
        color: isClean ? '#06b6d4' : '#f43f5e',
        size: isClean ? 2.5 : 3.5,
        type: isClean ? 'clean' : 'raw'
      });
    }

    // Interactive Core (Gold Standard Data Atom)
    nodes.push({ x3d: 0, y3d: 0, z3d: 0, color: '#eab308', size: 10, type: 'clean' });

    // Equator ring nodes
    for (let j = 0; j < 12; j++) {
      const rRing = 110;
      const phi = (j / 12) * Math.PI * 2;
      nodes.push({
        x3d: rRing * Math.cos(phi),
        y3d: 0,
        z3d: rRing * Math.sin(phi),
        color: '#3b82f6',
        size: 2,
        type: 'fixed'
      });
    }

    const rotateX = (node: Node3D, rad: number) => {
      const cos = Math.cos(rad);
      const sin = Math.sin(rad);
      const y = node.y3d * cos - node.z3d * sin;
      const z = node.y3d * sin + node.z3d * cos;
      node.y3d = y;
      node.z3d = z;
    };

    const rotateY = (node: Node3D, rad: number) => {
      const cos = Math.cos(rad);
      const sin = Math.sin(rad);
      const x = node.x3d * cos + node.z3d * sin;
      const z = -node.x3d * sin + node.z3d * cos;
      node.x3d = x;
      node.z3d = z;
    };

    const drawFrame = () => {
      ctx.clearRect(0, 0, width, height);

      // Orbital glow
      const cx = width / 2;
      const cy = height / 2;
      
      const radarGlow = ctx.createRadialGradient(cx, cy, 10, cx, cy, 120);
      radarGlow.addColorStop(0, 'rgba(59, 130, 246, 0.08)');
      radarGlow.addColorStop(0.5, 'rgba(6, 182, 212, 0.03)');
      radarGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.beginPath();
      ctx.arc(cx, cy, 120, 0, Math.PI * 2);
      ctx.fillStyle = radarGlow;
      ctx.fill();

      // Automatic spin or mouse manual tracking rotation
      nodes.forEach(node => {
        if (isRotating) {
          rotateY(node, angleY);
          rotateX(node, angleX);
        }
      });

      // Filter based on active controls
      const filtered = nodes.filter(n => {
        if (selectedPreset === 'all') return true;
        if (selectedPreset === 'clean') return n.type === 'clean' || n.type === 'fixed';
        return n.type === 'raw';
      });

      // Sort nodes by z depth so we render background nodes first and foreground last for accurate 3D drawing
      filtered.sort((a, b) => a.z3d - b.z3d);

      // Projected perspective camera scalar
      const fov = 180;

      // Draw interactive matrix wire connections between nodes
      ctx.strokeStyle = 'rgba(255,100,50,0.1)';
      ctx.lineWidth = 0.5;

      for (let i = 0; i < filtered.length; i++) {
        for (let j = i + 1; j < filtered.length; j++) {
          const nodeA = filtered[i];
          const nodeB = filtered[j];

          // Calculate 3D Euclidean Distance
          const dist = Math.hypot(nodeA.x3d - nodeB.x3d, nodeA.y3d - nodeB.y3d, nodeA.z3d - nodeB.z3d);
          
          if (dist < 65) {
            const scaleA = fov / (fov + nodeA.z3d);
            const scaleB = fov / (fov + nodeB.z3d);

            const ax = cx + nodeA.x3d * scaleA;
            const ay = cy + nodeA.y3d * scaleA;
            const bx = cx + nodeB.x3d * scaleB;
            const by = cy + nodeB.y3d * scaleB;

            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(bx, by);
            // Dynamic color opacity based on clean values vs dirty
            if (nodeA.type === 'clean' && nodeB.type === 'clean') {
              ctx.strokeStyle = `rgba(6, 182, 212, ${0.11 * (1 - dist / 65)})`;
            } else {
              ctx.strokeStyle = `rgba(244, 63, 94, ${0.14 * (1 - dist / 65)})`;
            }
            ctx.stroke();
          }
        }
      }

      // Draw single nodes with projected depths
      filtered.forEach(node => {
        const scale = fov / (fov + node.z3d);
        const px = cx + node.x3d * scale;
        const py = cy + node.y3d * scale;

        // Clip out of bounds
        if (px < 0 || px > width || py < 0 || py > height) return;

        const size = node.size * scale;
        
        ctx.beginPath();
        ctx.arc(px, py, Math.max(0.5, size), 0, Math.PI * 2);
        
        // Depth mapping shadows and glows
        ctx.fillStyle = node.color;
        ctx.shadowColor = node.color;
        ctx.shadowBlur = node.z3d < 0 ? 0 : 5; // glow overlay on foreground
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      });

      // Orbital indicator ring
      ctx.beginPath();
      ctx.ellipse(cx, cy, 115, 30, Math.PI / 6, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.15)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 12]);
      ctx.stroke();
      ctx.setLineDash([]);

      animationId = requestAnimationFrame(drawFrame);
    };

    drawFrame();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isRotating, angleX, angleY, selectedPreset]);

  // Touch & Drag controls to rotate manually
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsRotating(false);
    setDragState({ isDragging: true, startX: e.clientX, startY: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragState.isDragging) return;
    const diffX = e.clientX - dragState.startX;
    const diffY = e.clientY - dragState.startY;

    setAngleY(diffX * 0.0005);
    setAngleX(-diffY * 0.0005);
    setIsRotating(true);
  };

  const handleMouseUp = () => {
    setDragState({ ...dragState, isDragging: false });
  };

  return (
    <div ref={containerRef} className="flex flex-col items-center bg-slate-950/65 rounded-3xl p-5 border border-slate-800 shadow-2xl relative overflow-hidden group">
      {/* 3D Grid Accent Line */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
      
      {/* Active Diagnostics Indicator */}
      <div className="absolute top-4 left-4 flex items-center gap-1.5 text-[10px] font-mono text-cyan-400 bg-cyan-950/35 px-2.5 py-1 rounded-full border border-cyan-800/35">
        <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
        <span>3D MATRIX: LIVE</span>
      </div>

      <div className="text-center mt-3 select-none">
        <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase">{lang === 'en' ? "Simulated data grid" : "شبكة البيانات المجسمة"}</span>
        <h4 className="font-space text-xs sm:text-sm font-bold text-slate-350">{lang === 'en' ? "Data Integrity Cube" : "تفصيل النزاهة الهندسية للبيانات"}</h4>
      </div>

      {/* Actual 3D Renderer Stage */}
      <div 
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="cursor-grab active:cursor-grabbing my-3 focus:outline-none relative"
        title="Click and Drag to spin sphere manually!"
      >
        <canvas ref={canvasRef} className="block drop-shadow-[0_0_20px_rgba(6,182,212,0.15)]" />
        {/* Core Hover floating badge */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="px-2.5 py-1 bg-slate-900/90 text-[10px] font-mono font-bold text-white rounded border border-slate-750 shadow-md">
            MMA Core
          </div>
        </div>
      </div>

      {/* Simulation control panel */}
      <div className="w-full space-y-3">
        <div className="flex gap-1.5 justify-center bg-slate-900/60 p-1 rounded-xl border border-slate-800/80">
          <button
            onClick={() => setSelectedPreset('all')}
            className={`flex-1 py-1 px-2 text-[10px] font-bold font-mono uppercase tracking-tight rounded-lg transition-all ${
              selectedPreset === 'all' ? "bg-cyan-500 text-slate-950" : "text-slate-400 hover:text-white"
            }`}
          >
            {lang === 'en' ? "All Nodes" : "كامل العقد"}
          </button>
          <button
            onClick={() => setSelectedPreset('clean')}
            className={`flex-1 py-1 px-2 text-[10px] font-bold font-mono uppercase tracking-tight rounded-lg transition-all ${
              selectedPreset === 'clean' ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            {lang === 'en' ? "Clean Data" : "البيانات السليمة"}
          </button>
          <button
            onClick={() => setSelectedPreset('dirty')}
            className={`flex-1 py-1 px-2 text-[10px] font-bold font-mono uppercase tracking-tight rounded-lg transition-all ${
              selectedPreset === 'dirty' ? "bg-rose-600 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            {lang === 'en' ? "Dirty Data" : "الفوضى"}
          </button>
        </div>

        {/* Legend */}
        <div className="flex justify-between items-center text-[9px] font-mono text-slate-450 border-t border-slate-900 pt-2 px-1">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>{lang === 'en' ? "Standard" : "نظامي"}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            <span>{lang === 'en' ? "Anomalies" : "شاذة"}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-yellow-500" />
            <span>{lang === 'en' ? "Core" : "النواة"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
