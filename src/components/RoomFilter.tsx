import { Device } from '../features/devicesSlice';

interface Props {
  devices: Device[];
  activeRoom: string;
  setActiveRoom: (room: string) => void;
}

const roomIcons: Record<string, string> = {
  "Tümü": "🏠",
  "Salon": "🛋️",
  "Mutfak": "🍳",
  "Yatak Odası": "🛏️",
  "Çocuk Odası": "🧸",
  "Banyo": "🚿"
};

export default function RoomFilter({ devices, activeRoom, setActiveRoom }: Props) {
  const rooms = ['Tümü', ...new Set(devices.map(d => d.room))];

  return (
    <div style={{ 
      display: 'flex', 
      gap: '8px', 
      margin: '16px 0',
      flexWrap: 'wrap',
      zIndex: 1000
    }}>
      {rooms.map(room => (
        <button
          key={room}
          onClick={() => setActiveRoom(room)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: activeRoom === room ? '#1976d2' : 'transparent',
            color: activeRoom === room ? 'white' : '#1976d2',
            border: `1px solid ${activeRoom === room ? 'transparent' : '#1976d2'}`,
            padding: '8px 12px',
            borderRadius: '20px',
            cursor: 'pointer',
            fontSize: '14px',
            transition: 'all 0.3s ease'
          }}
        >
          <span style={{ fontSize: '18px' }}>{roomIcons[room] || '🏠'}</span>
          {room}
        </button>
      ))}
    </div>
  );
}