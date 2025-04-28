import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './app/store';
import { toggleDevice, setValue } from './features/devicesSlice';
import RoomFilter from './components/RoomFilter';

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  const dispatch = useDispatch();
  return <primitive object={scene} onClick={(e: any) => e.object.userData.deviceId && dispatch(toggleDevice(e.object.userData.deviceId))} />;
}

export default function App() {
  const devices = useSelector((state: RootState) => state.devices);
  const dispatch = useDispatch();
  const [darkMode, setDarkMode] = useState(false);
  const [activeRoom, setActiveRoom] = useState('Tümü');

  const filteredDevices = activeRoom === 'Tümü' 
    ? devices 
    : devices.filter(device => device.room === activeRoom);

  return (
    <div style={{ height: '100vh', background: darkMode ? '#121212' : '#f5f5f5' }}>
      <Canvas shadows camera={{ position: [5, 2, 10], fov: 25 }}>
        <Suspense fallback={null}>
          <Model url="/models/scene.gltf" />
          <Environment preset="city" />
        </Suspense>
        <OrbitControls />
      </Canvas>

      <div style={{ 
        position: 'absolute', 
        top: 20, 
        left: 20, 
        padding: '16px',
        background: darkMode ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.7)',
        borderRadius: '8px',
        zIndex: 1000
      }}>
        <h2 style={{ marginTop: 0 }}>🏠 Akıllı Ev Kontrol</h2>
        
        <RoomFilter 
          devices={devices} 
          activeRoom={activeRoom} 
          setActiveRoom={setActiveRoom} 
        />

        {filteredDevices.map(device => (
          <div key={device.id} style={{ marginBottom: '8px' }}>
            <label style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="checkbox"
                checked={device.status}
                onChange={() => dispatch(toggleDevice(device.id))}
                style={{ marginRight: '8px' }}
              />
              {device.icon} {device.name} ({device.room})
            </label>
            {device.type === 'thermostat' && (
              <div style={{ marginLeft: '24px' }}>
                <input
                  type="range"
                  min="16"
                  max="30"
                  value={device.value}
                  onChange={(e) => dispatch(setValue({
                    id: device.id,
                    value: parseInt(e.target.value)
                  }))}
                />
                <span> {device.value}°C</span>
              </div>
            )}
          </div>
        ))}

        <button 
          onClick={() => setDarkMode(!darkMode)}
          style={{
            marginTop: '16px',
            padding: '8px 16px',
            background: darkMode ? '#333' : '#ddd',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {darkMode ? '☀️ Aydınlık Mod' : '🌙 Karanlık Mod'}
        </button>
      </div>
    </div>
  );
}