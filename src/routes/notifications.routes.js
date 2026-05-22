const router = require('express').Router();
const protect = require('../middleware/auth.middleware');

router.get('/:userId', protect, (req, res) => res.json({ message: `Get notifications for ${req.params.userId} — TODO` }));
router.put('/:id/read', protect, (req, res) => res.json({ message: `Mark notification ${req.params.id} as read — TODO` }));

module.exports = router;