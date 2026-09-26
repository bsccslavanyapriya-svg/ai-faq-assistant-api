require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const faqRoutes = require('./routes/faqRoutes');

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('AI FAQ Assistant API is running!');
});

app.use('/api/faqs', faqRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));