const router = require('express').Router();
const { createLog, getLogs, getToday, getByDate, deleteLog } = require('../controllers/logs.controller');
const protect = require('../middleware/auth.middleware');

router.post('/', protect, createLog);
router.get('/', protect, getLogs);
router.get('/today', protect, getToday);
router.get('/:date', protect, getByDate);
router.delete('/:id', protect, deleteLog);

module.exports = router;
