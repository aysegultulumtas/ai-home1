import { useGLTF } from '@react-three/drei';

export default function ModelViewer() {

  const { scene } = useGLTF('/models/scene.gltf');
  
  return <primitive object={scene} />;
}