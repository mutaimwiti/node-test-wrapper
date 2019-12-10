import mongoose from 'mongoose';

const DEV_URL = 'mongodb://localhost:27017/ntw-es6-none';
const TEST_URL = `${DEV_URL}-test`;

const URL = process.env.NODE_ENV === 'test' ? TEST_URL : DEV_URL;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connect = (callback = null) => {
  return mongoose.connect(URL, options, callback);
};

const disconnect = (callback = null) => {
  return mongoose.disconnect(callback);
};

export { connect, disconnect };
