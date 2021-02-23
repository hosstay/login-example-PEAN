const express = require('express');

const app = module.exports = express.Router();

// app.use(compression());

const model = require('../models/security');

app.post('/api/security/verifyToken', model.verifyToken);