import { useGLTF, Html } from '@react-three/drei';
import { Suspense, useEffect } from 'react';

export default function Model() {
  // 1. Modeli mutlaka SUSPENSE ile sarmalayın
  const { scene } = useGLTF('/models/scene.gltf');

  // 2. Model yüklendiğinde otomatik konsola yazdır
  useEffect(() => {
    scene.traverse((obj) => {
      if (obj.isMesh) {
        obj.material = new THREE.MeshBasicMaterial({ 
          color: Math.random() * 0xffffff, // Rastgele renk
          wireframe: true // Kafes görünümü (nesneleri görmek için)
        });
        console.log("NESNE BULUNDU:", obj.name); 
      }
    });
  }, [scene]);

  return <primitive object={scene} />;
}

// 3. Uygulamanızda kullanın
function App() {
  return (
    <Suspense fallback={<Html><div>MODEL YÜKLENİYOR...</div></Html>}>
      <Model />
    </Suspense>
  );
}