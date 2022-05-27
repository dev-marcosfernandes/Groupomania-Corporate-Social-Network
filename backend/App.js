const sequelize = require('./models');
const express = require('express');
const app = express();
app.use(express.json({limit: '25mb'}));
const multer = require('./middleware/multer');

const blogsRoutes = require('./routes/blogs');
const userRoutes = require('./routes/user');
const commentRoutes = require('./routes/commentaires');

const path = require('path');

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


app.use('/api/posts', blogsRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/comment', commentRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;
