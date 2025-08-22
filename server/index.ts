import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { generatePalette } from './services/palette.js';

dotenv.config();

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;
const app = express();

app.use(cors());
app.use(express.json());

app.post('/generatePalette', async (req, res) => {
  try {
    const { description, theme } = req.body;

    if (!description && !theme) {
      return res.status(400).json({ error: 'Either description or theme is required.' });
    }

    const result = await generatePalette({ description, theme });
    res.json(result);
  } catch (error) {
    console.error('Error generating palette', error);
    res.status(500).json({ error: 'Failed to generate palette' });
  }
});

app.get('/health', (_, res) => {
  res.send('ok');
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});