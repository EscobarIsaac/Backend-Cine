// ms-usuarios/src/routes/usuario.routes.js
const express = require('express');
const { register, login } = require('../controllers/usuario.controller');
const router = express.Router();

router.post('/register', register);
router.post('/login',    login);

module.exports = router;
