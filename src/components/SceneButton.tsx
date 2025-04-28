import { Device } from '../features/devicesSlice';

interface Scene {
  name: string;
  actions: Partial<Device>[];
}

export const scenes: Scene[] = [
  {
    name: "Film Gecesi",
    actions: [
      { id: 1, status: false }, // Işığı kapat
      { id: 3, status: true }   // TV'yi aç
    ]
  }
];