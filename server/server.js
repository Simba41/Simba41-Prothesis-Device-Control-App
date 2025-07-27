require('dotenv').config();
const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');
const path     = require('path');

const apiRoutes = require('./routes/api'); 

const app  = express();
const PORT = process.env.PORT || 3000;

// ─── middleware ───────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ─── API ───────────────────────────────────────────────────────────────────────
app.use('/api', apiRoutes);                

// ─── front ────────────────────────────────────────────────────────────
app.use(express.static(path.join(__dirname,'..',  'client')));
app.get('/', (_, res) =>
  res.sendFile(path.join(__dirname,'..', 'client', 'index.html'))
);

// ─── Mongo ───────────────────────────────────────────────────────────
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () =>
      console.log(`Server ready → http://localhost:${PORT}`));
  })
  .catch(err => console.error('MongoDB error:', err));