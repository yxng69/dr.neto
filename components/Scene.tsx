"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import LiquidBackground from "./LiquidBackground";
import CameraController from "./CameraController";

function Monolith() {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (groupRef.current && meshRef.current) {
      // Rotación base continua
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;

      // Reacción magnética al ratón (Cyber-Brutalism feel)
      const targetX = (state.pointer.x * Math.PI) / 4;
      const targetY = (state.pointer.y * Math.PI) / 4;

      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -targetY, 0.05);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX, 0.05);
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef}>
        {/* Geometría base: Icosaedro detallado */}
        <icosahedronGeometry args={[2, 1]} />
        
        {/* Material oscuro, metálico */}
        <meshPhysicalMaterial 
          color="#050505" 
          metalness={0.9} 
          roughness={0.2} 
        />
        
        {/* Capa Wireframe Verde Ácido superpuesta para el look 'Digital' */}
        <mesh scale={1.02}>
          <icosahedronGeometry args={[2, 1]} />
          <meshBasicMaterial color="#ccff00" wireframe={true} transparent opacity={0.4} />
        </mesh>
      </mesh>
    </group>
  );
}

export default function Scene() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none bg-black">
      <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
        <CameraController />
        
        {/* Iluminación de Estudio Oscuro */}
        <ambientLight intensity={0.1} />
        <directionalLight position={[5, 5, 5]} intensity={3} color="#ccff00" />
        <directionalLight position={[-5, -5, -5]} intensity={1} color="#ffffff" />
        
        {/* Fondo Líquido Oscuro */}
        <LiquidBackground />

        {/* Objeto Central */}
        <Monolith />
      </Canvas>
    </div>
  );
}
