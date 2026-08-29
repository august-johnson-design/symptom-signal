const path = require('path');
const express = require('express');
const cors = require('cors');
const { port } = require('./config');
const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/events');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Something went wrong. Please try again.' });
});

if (require.main === module) app.listen(port, () => console.log(`Symptom Signal listening on http://localhost:${port}`));
module.exports = app;
