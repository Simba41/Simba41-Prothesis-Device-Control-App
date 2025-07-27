const Router = require('express').Router;
const router = Router();

router.use(require('./auth'));

module.exports = router;