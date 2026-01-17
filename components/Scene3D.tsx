"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import * as THREE from "three";

// Very subtle, abstract floating form
function AbstractForm() {
  const groupRef = useRef<THREE.Group>(null);
  const count = 5; // Much fewer nodes for subtlety

  // Generate minimal grid of positions
  const positions = useMemo(() => {
    const pos = [];
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        for (let z = 0; z < count; z++) {
          // Only add some positions for irregularity
          if ((x + y + z) % 2 === 0) {
            pos.push([
              (x - count / 2) * 2,
              (y - count / 2) * 2,
              (z - count / 2) * 2,
            ]);
          }
        }
      }
    }
    return pos;
  }, []);

  // Very slow, calm rotation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.03;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.02) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {positions.map((pos, i) => (
        <Node key={i} position={pos as [number, number, number]} index={i} />
      ))}
      <Lines positions={positions} />
    </group>
  );
}

// Minimal node
function Node({ position, index }: { position: [number, number, number]; index: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Very subtle breathing animation
      const t = state.clock.elapsedTime * 0.3 + index * 0.3;
      meshRef.current.position.y = position[1] + Math.sin(t) * 0.1;

      // Subtle scale pulse
      const scale = 1 + Math.sin(t * 0.5) * 0.1;
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <Sphere ref={meshRef} args={[0.12, 16, 16]} position={position}>
      <meshStandardMaterial
        color="#1F6F54"
        emissive="#1F6F54"
        emissiveIntensity={0.3}
        metalness={0.9}
        roughness={0.1}
        transparent
        opacity={0.8}
      />
    </Sphere>
  );
}

// Very subtle connecting lines
function Lines({ positions }: { positions: number[][] }) {
  const linesMaterial = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: new THREE.Color("#1F6F54"),
        transparent: true,
        opacity: 0.08,
      }),
    []
  );

  const linesGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];

    // Connect only very close nodes
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const distance = Math.hypot(
          positions[i][0] - positions[j][0],
          positions[i][1] - positions[j][1],
          positions[i][2] - positions[j][2]
        );

        if (distance < 3) {
          vertices.push(...positions[i], ...positions[j]);
        }
      }
    }

    geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
    return geometry;
  }, [positions]);

  return <lineSegments geometry={linesGeometry} material={linesMaterial} />;
}

// Main scene - very restrained and subtle
export default function Scene3D() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        {/* Very subtle lighting */}
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={0.4} color="#1F6F54" />
        <pointLight position={[-5, -5, -5]} intensity={0.2} color="#2B9C82" />

        <AbstractForm />
      </Canvas>
    </div>
  );
}
