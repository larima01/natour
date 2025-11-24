require('dotenv').config({
  path: require('path').join(__dirname, 'config.env'),
});
const mongoose = require('mongoose');
const app = require('./app');

if (!process.env.DATABASE || !process.env.DATABASE_PASSWORD) {
  console.error('Missing env vars');
  process.exit(1);
}

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  // .connect(process.env.DATABASE_LOCAL)
  .connect(DB) // no deprecated flags
  .then(() => console.log('DB connection successful!'))
  .catch((err) => {
    console.error('DB connection error:', err.message);
    process.exit(1);
  });

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App running on port ${port}...`));
