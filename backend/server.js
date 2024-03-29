import path from 'path';
import dotenv from 'dotenv';
import color from 'color';
import morgan from 'morgan';
import express from 'express';
import connectDB from './config/db.js';

import { notFound, errorHandler } from './middleware/error.middleware.js';
import productRoutes from './routes/product.routes.js';
import userRoutes from './routes/users.routes.js';
import orderRoutes from './routes/order.routes.js';
import uploadRoutes from './routes/upload.routes.js';

dotenv.config();

connectDB();

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json()); // allow to accept json in the body

app.get('/', (req, res) => {
  res.send('API is running.... !');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use(notFound);
app.use(errorHandler);

// Usage for dotenv package
const PORT = process.env.PORT || 3004;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .underline
  )
);
