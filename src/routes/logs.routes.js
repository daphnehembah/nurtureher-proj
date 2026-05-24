const router = require('express').Router();
const protect = require('../middleware/auth.middleware');
const validate = require('../middleware/validate.middleware');
const { logValidator } = require('../middleware/validators');
const { createLog, getLogs, getToday, getByDate, deleteLog } = require('../controllers/logs.controller');

router.get('/today', protect, getToday);
router.get('/:date', protect, getByDate);
router.get('/', protect, getLogs);
router.post('/', protect, logValidator, validate, createLog);
router.delete('/:id', protect, deleteLog);

module.exports = router;
