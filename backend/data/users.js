// This has to match the mongodb model we set
// For password you are using package called bcryptjs for hashing

import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('Pass1234', 10),
    isAdmin: true,
  },
  {
    name: 'Foo Bar',
    email: 'foobar@example.com',
    password: bcrypt.hashSync('Pass1234', 10),
  },
  {
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: bcrypt.hashSync('Pass1234', 10),
  },
];

export default users;
