const express = require('express');
const pool = require('../db');
const { requireAuth } = require('../middleware/auth');
const { validateEvent } = require('../validation');

const router = express.Router();
router.use(requireAuth);

router.get('/', async (req, res, next) => {
  const end = req.query.end || new Date().toISOString().slice(0, 10);
  const start = req.query.start || new Date(Date.now() - 29 * 86400000).toISOString().slice(0, 10);
  try {
    const result = await pool.query(
      `SELECT id, symptom_name AS "symptomName", severity, notes, occurred_at AS "occurredAt"
       FROM symptom_events WHERE user_id = $1 AND occurred_at >= $2::date AND occurred_at < ($3::date + INTERVAL '1 day')
       ORDER BY occurred_at DESC`,
      [req.user.sub, start, end]
    );
    return res.json({ events: result.rows });
  } catch (error) { return next(error); }
});

router.post('/', async (req, res, next) => {
  const parsed = validateEvent(req.body);
  if (parsed.error) return res.status(400).json({ error: parsed.error });
  const { symptomName, severity, notes } = parsed.value;
  try {
    const result = await pool.query(
      `INSERT INTO symptom_events (user_id, symptom_name, severity, notes)
       VALUES ($1, $2, $3, $4)
       RETURNING id, symptom_name AS "symptomName", severity, notes, occurred_at AS "occurredAt"`,
      [req.user.sub, symptomName, severity, notes]
    );
    return res.status(201).json({ event: result.rows[0] });
  } catch (error) { return next(error); }
});

module.exports = router;
