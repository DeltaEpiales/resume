import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Stars } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

function AnimatedSphere() {
  const sphereRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.x = clock.getElapsedTime() * 0.2;
      sphereRef.current.rotation.y = clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Sphere ref={sphereRef} args={[1.5, 100, 100]} position={[0, 0, 0]}>
      <MeshDistortMaterial
        color="#4338ca"
        attach="material"
        distort={0.6}
        speed={1.5}
        roughness={0.2}
        metalness={0.8}
        emissive="#4338ca"
        emissiveIntensity={0.5}
      />
    </Sphere>
  );
}

function ParticleField() {
  return <Stars radius={50} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />;
}

export default function Quantum3DScene() {
  return (
    <div className="h-screen w-full absolute top-0 left-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ antialias: true }}
        dpr={window.devicePixelRatio}
      >
        <color attach="background" args={['#000000']} />
        <fog attach="fog" args={['#000000', 5, 15]} />
        
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4338ca" />
        
        <ParticleField />
        <AnimatedSphere />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          autoRotate
          autoRotateSpeed={0.5}
        />
        
        <EffectComposer>
          <Bloom
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            intensity={2}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}