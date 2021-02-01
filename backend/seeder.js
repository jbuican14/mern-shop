import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';

import users from './data/users.js';
import products from './data/products.js';

import User from './models/user.model.js';
import Product from './models/product.model.js';
import Order from './models/order.model.js';

import connectDB from './config/db.js';

dotenv.config();

connectDB();

// Create a connection to database
// Async function
const importData = async () => {
  // clear from Model
  // return type 'Promise'
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // import user
    // type Array
    const createdUsers = await User.insertMany(users);

    // admin is the first in the data index 0 from our data/users.js
    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);

    console.log('Data Imported'.green.inverse);
    process.exit();
  } catch (err) {
    console.error(`err: ${err}`.red.inverse);
    process.exit(1); // passing 1 as error
  }
};

const destroyData = async () => {
  // clear from Model
  // return type 'Promise'
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data Deatroyed'.red.inverse);
    process.exit();
  } catch (err) {
    console.error(`error: ${err}`.red.inverse);
    process.exit(1); // passing 1 as error
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
