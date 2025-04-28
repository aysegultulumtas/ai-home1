import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF } from '@react-three/drei';
import { Suspense } from 'react';

function HouseModel() {
  const { scene } = useGLTF('/house-model.glb');
  scene.traverse((child) => {
    if (child.name.includes("salon")) child.userData.room = "Salon";
    if (child.name.includes("yatak")) child.userData.room = "Yatak Odası";
    if (child.name.includes("cocuk")) child.userData.room = "Çocuk Odası";
  });
  return <primitive object={scene} scale={0.5} position={[0, -1, 0]} />;
}

export default function ThreeDHouse() {
  return (
    <div style={{ height: '500px', width: '100%' }}>
      <Canvas shadows camera={{ position: [5, 2, 10], fov: 25 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} castShadow />
        <Suspense fallback={null}>
          <HouseModel />
          <Environment preset="city" />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  );
}