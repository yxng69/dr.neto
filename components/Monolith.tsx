'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Monolith() {
  const monolithRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!monolithRef.current || !innerRef.current) return;

    // Base continuous slow rotation
    innerRef.current.rotation.x += delta * 0.1;
    innerRef.current.rotation.y += delta * 0.15;

    // Micro-interaction: react to mouse position
    // Map pointer coordinates (-1 to 1) to a slight rotation angle
    const targetX = (state.pointer.y * Math.PI) / 6;
    const targetY = (state.pointer.x * Math.PI) / 6;

    // Smoothly interpolate current rotation towards target rotation
    monolithRef.current.rotation.x = THREE.MathUtils.lerp(monolithRef.current.rotation.x, targetX, 0.05);
    monolithRef.current.rotation.y = THREE.MathUtils.lerp(monolithRef.current.rotation.y, targetY, 0.05);
  });

  return (
    <group ref={monolithRef}>
      <group ref={innerRef}>
        {/* Core solid mesh */}
        <mesh>
          <icosahedronGeometry args={[2, 2]} />
          <meshPhysicalMaterial 
            color="#050505" 
            metalness={0.95} 
            roughness={0.15} 
            clearcoat={1.0}
            clearcoatRoughness={0.1}
          />
        </mesh>

        {/* Wireframe overlay */}
        <mesh scale={1.02}>
          <icosahedronGeometry args={[2, 2]} />
          <meshBasicMaterial 
            color="#ccff00" 
            wireframe={true} 
            transparent={true}
            opacity={0.3}
          />
        </mesh>
      </group>
    </group>
  );
}
