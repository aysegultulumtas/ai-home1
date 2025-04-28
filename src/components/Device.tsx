import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, Typography, Switch } from '@mui/material';

export default function Device({ device }: { device: any }) {
  const [isOn, setIsOn] = useState(device.status);

  return (
    <motion.div whileHover={{ scale: 1.03 }}>
      <Card sx={{ 
        width: 200,
        background: isOn ? '#e3f2fd' : '#fafafa'
      }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {device.icon} {device.name}
          </Typography>
          <Typography color="text.secondary">
            {device.room}
          </Typography>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
            <Switch 
              checked={isOn}
              onChange={() => setIsOn(!isOn)}
              color={isOn ? 'primary' : 'default'}
            />
            <Typography ml={1}>
              {isOn ? 'Açık' : 'Kapalı'}
            </Typography>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}