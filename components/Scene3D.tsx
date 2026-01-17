"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import * as THREE from "three";

// Animated grid of floating nodes
function FloatingNodes() {
  const groupRef = useRef<THREE.Group>(null);
  const count = 8;

  // Generate positions for nodes in a grid pattern
  const positions = useMemo(() => {
    const pos = [];
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        for (let z = 0; z < count; z++) {
          pos.push([
            (x - count / 2) * 1.5,
            (y - count / 2) * 1.5,
            (z - count / 2) * 1.5,
          ]);
        }
      }
    }
    return pos;
  }, []);

  // Animate the group
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.2;
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

// Individual node sphere
function Node({ position, index }: { position: [number, number, number]; index: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating animation
      const t = state.clock.elapsedTime + index * 0.2;
      meshRef.current.position.y = position[1] + Math.sin(t) * 0.15;
    }
  });

  return (
    <Sphere ref={meshRef} args={[0.08, 16, 16]} position={position}>
      <meshStandardMaterial
        color="#1F6F54"
        emissive="#1F6F54"
        emissiveIntensity={0.5}
        metalness={0.8}
        roughness={0.2}
      />
    </Sphere>
  );
}

// Connecting lines between nodes
function Lines({ positions }: { positions: number[][] }) {
  const linesMaterial = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: new THREE.Color("#1F6F54"),
        transparent: true,
        opacity: 0.15,
      }),
    []
  );

  const linesGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];

    // Connect nearby nodes
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const distance = Math.hypot(
          positions[i][0] - positions[j][0],
          positions[i][1] - positions[j][1],
          positions[i][2] - positions[j][2]
        );

        // Only connect close nodes
        if (distance < 2) {
          vertices.push(...positions[i], ...positions[j]);
        }
      }
    }

    geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
    return geometry;
  }, [positions]);

  return <lineSegments geometry={linesGeometry} material={linesMaterial} />;
}

// Main 3D Scene Component
export default function Scene3D() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#2B9C82" />

        <FloatingNodes />

        {/* Subtle orbit controls for mouse interaction */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
}
