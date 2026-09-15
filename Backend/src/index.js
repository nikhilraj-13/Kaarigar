import dotenv from 'dotenv';
import app from './app.js';
import { PORT } from './config/constants.js';

dotenv.config();

app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n======================================================`);
  console.log(`🏺 Kaarigar Universal API Server running on port ${PORT}`);
  console.log(`📡 Local Web URL:    http://localhost:${PORT}/api`);
  console.log(`📱 Android Emulator: http://10.0.2.2:${PORT}/api`);
  console.log(`======================================================\n`);
});
