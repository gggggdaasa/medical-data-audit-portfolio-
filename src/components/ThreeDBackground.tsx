import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { playHoverSound } from '../utils/audio';

function NodeNetwork() {
  const groupRef = useRef<THREE.Group>(null);
  const count = 75;
  const radius = 3.2;

  // Generate spherical point coordinates
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Golden ratio placement or uniform random spherical distribution
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      
      const r = radius * (0.85 + Math.random() * 0.3); // slight depth thickness
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      
      arr[i * 3] = x;
      arr[i * 3 + 1] = y;
      arr[i * 3 + 2] = z;
    }
    return arr;
  }, [count, radius]);

  // Generate lines connecting vertices that are close
  const linePositions = useMemo(() => {
    const pts: number[] = [];
    const threshold = 1.95;
    for (let i = 0; i < count; i++) {
      const ax = positions[i * 3];
      const ay = positions[i * 3 + 1];
      const az = positions[i * 3 + 2];
      
      for (let j = i + 1; j < count; j++) {
        const bx = positions[j * 3];
        const by = positions[j * 3 + 1];
        const bz = positions[j * 3 + 2];
        
        const dist = Math.hypot(ax - bx, ay - by, az - bz);
        if (dist < threshold) {
          pts.push(ax, ay, az);
          pts.push(bx, by, bz);
        }
      }
    }
    return new Float32Array(pts);
  }, [positions, count]);

  // Individual high fidelity rotating gold/cyan cores
  const cores = useMemo(() => {
    return [
      { pos: new THREE.Vector3(0, 0, 0), color: '#eab308', size: 0.16, glow: true }, // MMA Core
      { pos: new THREE.Vector3(1.4, 0.8, -1.0), color: '#06b6d4', size: 0.08 }, // Standard cyan Node
      { pos: new THREE.Vector3(-1.3, -0.9, 1.1), color: '#3b82f6', size: 0.08 }, // Standard blue Node
      { pos: new THREE.Vector3(-1.0, 1.2, -1.1), color: '#10b981', size: 0.06 }, // Validated emerald node
      { pos: new THREE.Vector3(1.1, -1.3, 1.3), color: '#f43f5e', size: 0.07 }, // Outlier rose node
    ];
  }, []);

  // Soft continuous rotation
  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = elapsed * 0.024;
      groupRef.current.rotation.x = elapsed * 0.009;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Node Point Cloud */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#06b6d4"
          size={0.065}
          sizeAttenuation={true}
          transparent={true}
          opacity={0.7}
          depthWrite={false}
        />
      </points>

      {/* Connection Mesh Lines */}
      {linePositions.length > 0 && (
        <lineSegments>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[linePositions, 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial
            color="#3b82f6"
            transparent={true}
            opacity={0.16}
            depthWrite={false}
          />
        </lineSegments>
      )}

      {/* Volumetric Spherical Main Nodes */}
      {cores.map((core, i) => (
        <mesh 
          key={i} 
          position={core.pos}
          onPointerOver={(e) => {
            e.stopPropagation();
            playHoverSound('nodal');
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={() => {
            document.body.style.cursor = 'default';
          }}
        >
          <sphereGeometry args={[core.size, 20, 20]} />
          <meshStandardMaterial
            color={core.color}
            emissive={core.color}
            emissiveIntensity={core.glow ? 0.6 : 0.25}
            roughness={0.15}
            metalness={0.8}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function ThreeDBackground() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden opacity-55">
      {/* Smooth fading mask to integrate WebGL rendering beautifully into dark background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-transparent to-[#030712] z-10 pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#030712] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#030712] to-transparent z-10 pointer-events-none" />

      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
        style={{ width: '100%', height: '100%', pointerEvents: 'auto' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[8, 8, 8]} intensity={1.5} color="#3b82f6" />
        <pointLight position={[-8, -8, -8]} intensity={0.8} color="#06b6d4" />
        <NodeNetwork />
      </Canvas>
    </div>
  );
}
