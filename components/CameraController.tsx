"use client";

import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CameraController() {
  const { camera } = useThree();

  useEffect(() => {
    // Set initial camera position
    camera.position.set(0, 0, 7);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 1, // Smooth scrubbing
      },
    });

    // Animate camera passing through the Monolith into the void
    tl.to(camera.position, {
      z: -3,
      ease: "none",
    });

    return () => {
      // Cleanup to prevent memory leaks in Next.js
      tl.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [camera]);

  return null;
}
