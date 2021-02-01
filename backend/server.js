import dotenv from 'dotenv';
import color from 'color';
import express from 'express';
import connectDB from './config/db.js';

import { notFound, errorHandler } from './middleware/error.middleware.js';
import productRoutes from './routes/product.routes.js';

dotenv.config();

connectDB();

const app = express();

app.get('/', (req, res) => {
  res.send('API is running.... !');
});

app.use('/api/products', productRoutes);

app.use(notFound);
app.use(errorHandler);

// Usage for dotenv package
const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .underline
  )
);
