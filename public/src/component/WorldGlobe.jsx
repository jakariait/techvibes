"use client";

import React, { useEffect, useRef } from "react";
import Globe from "react-globe.gl";
import * as THREE from "three";

const WorldGlobe = ({
                           size = 420,
                           className = "",
                         }) => {
  const globeEl = useRef();

  useEffect(() => {
    if (!globeEl.current) return;

    const globe = globeEl.current;
    const controls = globe.controls();

    // 🔒 Disable interaction
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableRotate = false;

    // 🌍 Ambient rotation
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.25;

    // ☁️ Clouds
    const CLOUDS_IMG_URL = "/clouds.png";
    const CLOUDS_ALT = 0.004;
    const CLOUDS_ROTATION_SPEED = -0.006;

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
        requestAnimationFrame(animateClouds);
      };

      animateClouds();
    });
  }, []);

  return (
    <div
      className={`absolute pointer-events-none ${className}`}
      style={{ width: size, height: size }}
    >
      <Globe
        ref={globeEl}
        animateIn={false}
        width={size}
        height={700}
        backgroundColor="rgba(0,0,0,0)"
        globeImageUrl="//cdn.jsdelivr.net/npm/three-globe/example/img/earth-blue-marble.jpg"
        bumpImageUrl="//cdn.jsdelivr.net/npm/three-globe/example/img/earth-topology.png"
      />
    </div>
  );
};

export default WorldGlobe;
