"use client";

import React, { useEffect, useRef, useState } from "react";
import Globe from "react-globe.gl";
import * as THREE from "three";

function GlobeEllipse({ className }) {
  const globeEl = useRef();
  const containerRef = useRef();
  const [globeSize, setGlobeSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setGlobeSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    updateSize(); // Set initial size
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    if (!globeEl.current || globeSize.width === 0 || globeSize.height === 0) return;

    const globe = globeEl.current;
    const controls = globe.controls();

    // 🔒 No user interaction
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableRotate = false;

    // 🌍 Slow ambient rotation
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.25;

    // ☁️ Optional clouds
    const CLOUDS_IMG_URL = "/clouds.png";
    const CLOUDS_ALT = 0.004;
    const CLOUDS_ROTATION_SPEED = -0.006;

    let animationFrameId; // Declare animationFrameId here

    new THREE.TextureLoader().load(CLOUDS_IMG_URL, (cloudsTexture) => {
      const clouds = new THREE.Mesh(
        new THREE.SphereGeometry(
          globe.getGlobeRadius() * (1 + CLOUDS_ALT),
          75,
          75
        ),
        new THREE.MeshPhongMaterial({
          map: cloudsTexture,
          transparent: true,
          depthWrite: false,
        })
      );

      globe.scene().add(clouds);

      const animateClouds = () => {
        clouds.rotation.y +=
          (CLOUDS_ROTATION_SPEED * Math.PI) / 180;
        animationFrameId = requestAnimationFrame(animateClouds);
      };

      animateClouds();
    });

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      // Consider removing clouds mesh if necessary for a more thorough cleanup
    };
  }, [globeSize]);

  return (
    <div
      ref={containerRef}
      data-node-id="1:2555"
      className={`absolute pointer-events-none w-full h-full ${className}`}
    >
      <div className="absolute inset-[-4.19%]">
        <Globe
          ref={globeEl}
          animateIn={false}
          width={globeSize.width * (1 + 2 * 0.0419)} // Adjust width for the inset
          height={globeSize.height * (1 + 2 * 0.0419)} // Adjust height for the inset
          backgroundColor="rgba(0,0,0,0)"
          globeImageUrl="//cdn.jsdelivr.net/npm/three-globe/example/img/earth-blue-marble.jpg"
          bumpImageUrl="//cdn.jsdelivr.net/npm/three-globe/example/img/earth-topology.png"
        />
      </div>
    </div>
  );
}

export default GlobeEllipse;
