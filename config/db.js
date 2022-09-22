const { default: mongoose } = require('mongoose');

const connectDB = async () => {
  return mongoose
    .connect('mongodb://localhost/nursemanage')
    .then(() =>
      console.log('connection to the database established...')
    )
    .catch((err) => console.log(err));
};
module.exports = connectDB;
