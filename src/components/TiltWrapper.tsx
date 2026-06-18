import React, { useState, useRef } from 'react';

interface TiltWrapperProps {
  children: React.ReactNode;
  className?: string;
  maxRotation?: number; // max rotation degrees, default 10
  key?: React.Key;
}

export default function TiltWrapper({ children, className = '', maxRotation = 10 }: TiltWrapperProps) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    // Relative coordinate percentages (-0.5 to 0.5)
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    setCoords({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCoords({ x: 0, y: 0 });
  };

  // Target rotation angles (tilt opposite to axis)
  const rotateX = -coords.y * maxRotation;
  const rotateY = coords.x * maxRotation;

  // Reflection element style
  const glareStyle: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    background: `radial-gradient(circle at ${(coords.x + 0.5) * 100}% ${(coords.y + 0.5) * 100}%, rgba(6, 182, 212, 0.15) 0%, transparent 60%)`,
    pointerEvents: 'none',
    opacity: isHovered ? 1 : 0,
    transition: 'opacity 0.2s ease',
    zIndex: 2,
    borderRadius: 'inherit',
  };

  const cardStyle: React.CSSProperties = {
    transform: isHovered
      ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
      : `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
    transition: isHovered ? 'none' : 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
    position: 'relative',
    transformStyle: 'preserve-3d',
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={cardStyle}
      className={`preserve-3d ${className}`}
    >
      <div style={glareStyle} />
      {/* 3D Content Container with nested translation depth */}
      <div className="w-full h-full preserve-3d" style={{ transform: 'translateZ(20px)' }}>
        {children}
      </div>
    </div>
  );
}
