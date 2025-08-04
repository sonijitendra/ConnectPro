import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Simple GET route for root
app.get('/', (req, res) => {
  console.log('hello from server');
  res.json({ message: 'Hello from server!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
