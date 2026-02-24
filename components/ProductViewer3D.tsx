"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";

export default function ProductViewer3D() {
  return (
    <div className="w-full h-full relative">
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
        {/* Environment & Lighting */}
        <Environment preset="city" />
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          color="#ffffff"
        />
        <directionalLight
          position={[-10, -10, -5]}
          intensity={0.5}
          color="#ccff00"
        />

        {/* The Digital Garment (Placeholder) */}
        <mesh position={[0, 0, 0]} castShadow>
          <torusKnotGeometry args={[1, 0.3, 200, 32]} />
          <meshPhysicalMaterial
            color="#ffffff"
            metalness={0.9}
            roughness={0.1}
            clearcoat={1}
            clearcoatRoughness={0.1}
            iridescence={0.5}
            iridescenceIOR={1.5}
            iridescenceThicknessRange={[100, 400]}
          />
        </mesh>

        {/* Base Shadow */}
        <ContactShadows
          position={[0, -1.5, 0]}
          opacity={0.8}
          scale={10}
          blur={2}
          far={4}
          color="#000000"
        />

        {/* Controls */}
        <OrbitControls
          enableZoom={false}
          autoRotate={true}
          autoRotateSpeed={0.5}
          enablePan={false}
        />
      </Canvas>
    </div>
  );
}
