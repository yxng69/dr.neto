"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform float uTime;
varying vec2 vUv;

// Simplex 2D noise
vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
  + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
    dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 uv = vUv;
  
  // Create animated noise
  float noise1 = snoise(uv * 3.0 + uTime * 0.1);
  float noise2 = snoise(uv * 6.0 - uTime * 0.15);
  float finalNoise = snoise(uv * 2.0 + vec2(noise1, noise2) * 0.5 + uTime * 0.05);
  
  // Map noise to colors
  // Base colors: Black (#000000) to Dark Gray (#111111)
  vec3 color1 = vec3(0.0, 0.0, 0.0);
  vec3 color2 = vec3(0.066, 0.066, 0.066); // #111111
  
  // Acid green flashes (#ccff00)
  vec3 acidGreen = vec3(0.8, 1.0, 0.0);
  
  // Mix base colors
  float mixFactor = smoothstep(-1.0, 1.0, finalNoise);
  vec3 finalColor = mix(color1, color2, mixFactor);
  
  // Add subtle acid green flashes where noise is very high
  float flashFactor = smoothstep(0.8, 1.0, finalNoise);
  finalColor = mix(finalColor, acidGreen, flashFactor * 0.3); // 0.3 opacity for flashes
  
  gl_FragColor = vec4(finalColor, 1.0);
}
`;

export default function LiquidBackground() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
    }),
    []
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh position={[0, 0, -10]}>
      {/* Make the plane large enough to cover the screen */}
      <planeGeometry args={[viewport.width * 3, viewport.height * 3]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
      />
    </mesh>
  );
}
