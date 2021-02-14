import dotenv from 'dotenv';
import color from 'color';
import express from 'express';
import connectDB from './config/db.js';

import { notFound, errorHandler } from './middleware/error.middleware.js';
import productRoutes from './routes/product.routes.js';
import userRoutes from './routes/users.routes.js';
import orderRoutes from './routes/order.routes.js';

dotenv.config();

connectDB();

const app = express();
app.use(express.json()); // allow to accept json in the body

app.get('/', (req, res) => {
  res.send('API is running.... !');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

app.use(notFound);
app.use(errorHandler);

// Usage for dotenv package
const PORT = process.env.PORT || 3001;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .underline
  )
);
