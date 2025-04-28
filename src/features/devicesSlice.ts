import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Device {
  id: number;
  name: string;
  type: 'light' | 'thermostat' | 'outlet';
  room: string;
  status: boolean;
  value?: number;
  icon?: string;
}

const initialState: Device[] = [
  {
    id: 1,
    name: "Salon Işığı",
    type: "light",
    room: "Salon",
    status: false,
    icon: "💡"
  },
  {
    id: 2,
    name: "Mutfak Işığı",
    type: "light",
    room: "Mutfak",
    status: false,
    icon: "💡"
  },
  {
    id: 3,
    name: "Klima",
    type: "thermostat",
    room: "Salon",
    status: true,
    value: 24,
    icon: "❄️"
  },
  {
    id: 4,
    name: "Yatak Odası Işığı",
    type: "light",
    room: "Yatak Odası",
    status: false,
    icon: "🛏️"
  },
  {
    id: 5,
    name: "Çocuk Odası Işığı",
    type: "light",
    room: "Çocuk Odası",
    status: false,
    icon: "🧸"
  },
  {
    id: 6,
    name: "Bebek Monitörü",
    type: "outlet",
    room: "Çocuk Odası",
    status: true,
    icon: "👶"
  }
];

export const devicesSlice = createSlice({
  name: 'devices',
  initialState,
  reducers: {
    toggleDevice: (state, action: PayloadAction<number>) => {
      const device = state.find(d => d.id === action.payload);
      if (device) device.status = !device.status;
    },
    setValue: (state, action: PayloadAction<{id: number, value: number}>) => {
      const device = state.find(d => d.id === action.payload.id);
      if (device && device.type === 'thermostat') device.value = action.payload.value;
    }
  }
});

export const { toggleDevice, setValue } = devicesSlice.actions;
export default devicesSlice.reducer;