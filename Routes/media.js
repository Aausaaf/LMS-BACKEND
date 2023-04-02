const express = require('express');

const mediaRoutes = express.Router()

mediaRoutes.post('/api/upload', upload.single('file'),)