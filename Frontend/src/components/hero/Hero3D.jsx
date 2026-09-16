import React, { useRef, useState, useEffect, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, Sparkles, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

function CeramicPottery({ color = '#D95D39' }) {
  const potRef = useRef();

  useFrame((state, delta) => {
    if (potRef.current) {
      potRef.current.rotation.y += delta * 0.35;
      potRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.04;
    }
  });

  // Smooth handcrafted Indian Terracotta Kalash / Urn profile
  const points = useMemo(() => {
    const rawControlPoints = [
      new THREE.Vector2(0, -1.2),       // Base center
      new THREE.Vector2(0.42, -1.2),    // Base flat foot
      new THREE.Vector2(0.55, -1.1),    // Base bevel
      new THREE.Vector2(0.85, -0.6),    // Lower swelling belly
      new THREE.Vector2(0.98, -0.05),   // Widest rounded belly
      new THREE.Vector2(0.90, 0.45),    // Upper belly
      new THREE.Vector2(0.66, 0.82),    // Graceful shoulder taper
      new THREE.Vector2(0.44, 1.08),    // Narrow waist / throat
      new THREE.Vector2(0.45, 1.28),    // Flaring neck
      new THREE.Vector2(0.62, 1.44),    // Flared outer rim lip
      new THREE.Vector2(0.56, 1.50),    // Top lip crown
      new THREE.Vector2(0.40, 1.45),    // Inner rim
      new THREE.Vector2(0.33, 1.25),    // Inner neck
      new THREE.Vector2(0.33, 1.0),     // Inner throat
      new THREE.Vector2(0.52, 0.2),     // Inner pot cavity
      new THREE.Vector2(0.32, -0.95),   // Inner pot lower
      new THREE.Vector2(0, -1.05),      // Inner base center
    ];

    const curve = new THREE.SplineCurve(rawControlPoints);
    return curve.getPoints(60);
  }, []);

  return (
    <group ref={potRef} position={[0, -0.1, 0]} scale={0.88}>
      {/* Main Terracotta / Glazed Ceramic Body */}
      <mesh castShadow receiveShadow>
        <latheGeometry args={[points, 64]} />
        <meshStandardMaterial
          color={color}
          roughness={0.45}
          metalness={0.08}
          clearcoat={0.15}
          clearcoatRoughness={0.4}
        />
      </mesh>

      {/* Decorative Traditional Hand-Painted Rings */}
      {/* Saffron Neck Band */}
      <mesh position={[0, 0.98, 0]}>
        <torusGeometry args={[0.46, 0.02, 16, 64]} />
        <meshStandardMaterial color="#E8A428" roughness={0.3} metalness={0.2} />
      </mesh>

      {/* Cream White Shoulder Band */}
      <mesh position={[0, 0.72, 0]}>
        <torusGeometry args={[0.72, 0.022, 16, 64]} />
        <meshStandardMaterial color="#FAF8F3" roughness={0.3} metalness={0.1} />
      </mesh>

      {/* Forest Green Belly Accent Ring */}
      <mesh position={[0, 0.52, 0]}>
        <torusGeometry args={[0.88, 0.02, 16, 64]} />
        <meshStandardMaterial color="#225541" roughness={0.35} metalness={0.15} />
      </mesh>

      {/* Subtle Warm Kiln Embers / Dust Particles */}
      <Sparkles
        count={16}
        scale={2.4}
        size={2.2}
        speed={0.3}
        opacity={0.5}
        color="#F5BE4E"
      />
    </group>
  );
}

function FallbackArtisanVase() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-clay-100 rounded-3xl border-2 border-charcoal-800 shadow-brutal">
      <div className="w-36 h-36 rounded-full bg-clay-500 border-4 border-charcoal-800 shadow-brutal flex items-center justify-center text-5xl animate-bounce">
        🏺
      </div>
      <p className="mt-4 font-serif font-bold text-charcoal-800 text-base">Hand-Thrown Terracotta Kiln Pot</p>
      <span className="text-xs font-semibold text-clay-700 bg-white px-3 py-1 rounded-full border border-charcoal-800 mt-2">
        Batch #12 • Khurja Uttar Pradesh
      </span>
    </div>
  );
}

export const Hero3D = ({ vaseColor = '#D95D39' }) => {
  const [hasError, setHasError] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || hasError) {
    return <FallbackArtisanVase />;
  }

  return (
    <div className="relative w-full h-[360px] sm:h-[400px] md:h-[440px] flex items-center justify-center overflow-hidden">
      <Canvas
        shadows
        camera={{ position: [0, 0.25, 4.6], fov: 38 }}
        onError={() => setHasError(true)}
        className="cursor-grab active:cursor-grabbing"
      >
        <ambientLight intensity={0.85} />
        <directionalLight position={[4, 7, 4]} intensity={1.5} castShadow />
        <directionalLight position={[-4, 1, -2]} intensity={0.4} color="#E8A428" />
        <directionalLight position={[0, 4, -4]} intensity={0.6} color="#FAF8F3" />
        <pointLight position={[0, -1.5, 2]} intensity={0.4} color="#D95D39" />

        <Suspense fallback={null}>
          <Float speed={1.8} rotationIntensity={0.3} floatIntensity={0.4}>
            <CeramicPottery color={vaseColor} />
          </Float>
          <ContactShadows
            position={[0, -1.35, 0]}
            opacity={0.45}
            scale={3.5}
            blur={2.2}
            far={3.0}
            color="#1C1917"
          />
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2 + 0.2}
          minPolarAngle={Math.PI / 2 - 0.3}
        />
      </Canvas>

      {/* Floating UI Helper Badges */}
      <div className="absolute bottom-3 left-4 md:left-5 z-10 bg-white/95 backdrop-blur-sm border-2 border-charcoal-800 px-3 py-1.5 rounded-full shadow-brutal-sm text-[11px] font-bold text-charcoal-800 flex items-center gap-2 pointer-events-none">
        <span className="inline-block w-2 h-2 rounded-full bg-forest-600 animate-ping"></span>
        <span>Drag to rotate 3D craft</span>
      </div>

      <div className="absolute top-3 right-4 z-10 bg-mustard-400 border-2 border-charcoal-800 px-3 py-1 rounded-xl shadow-brutal text-[11px] font-black text-charcoal-900 rotate-1">
        <span>🏺 Khurja Batch #12</span>
      </div>
    </div>
  );
};
