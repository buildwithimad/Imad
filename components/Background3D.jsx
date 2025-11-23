'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Float, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Particle field
function ParticleField() {
  const pointsRef = useRef();
  const particleCount = 2000; // reduced for performance

  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40;

      const color = new THREE.Color();
      color.setHSL(Math.random(), 0.7, 0.5);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.03;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particleCount} array={particles.positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={particleCount} array={particles.colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.08} vertexColors transparent opacity={0.5} />
    </points>
  );
}

// Morphing sphere
function MorphingSphere({ position, color, scale = 1 }) {
  const meshRef = useRef();
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={meshRef} args={[1, 32, 32]} scale={scale} position={position}>
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.5} />
      </Sphere>
    </Float>
  );
}

// 3D Scene
function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.7} />
      <pointLight position={[-10, -10, -10]} color="#8b5cf6" intensity={0.4} />

      <ParticleField />

      <MorphingSphere position={[-3, 1, -2]} color="#06b6d4" scale={0.8} />
      <MorphingSphere position={[2, -1, -3]} color="#8b5cf6" scale={1.1} />
      <MorphingSphere position={[0, 2, -2]} color="#10b981" scale={0.6} />
      <MorphingSphere position={[3, -2, -4]} color="#f59e0b" scale={0.9} />

      <Environment preset="sunset" />
    </>
  );
}

export default function Background3D() {
  return (
    <div className="fixed inset-0 -z-1 bg-black">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 70 }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        dpr={[1, 2]} // Responsive pixel ratio
        performance={{ min: 0.5 }} // Reduce quality on low-end devices
      >
        <Scene />
      </Canvas>
    </div>
  );
}