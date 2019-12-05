import mongoose from 'mongoose';

const MONGO_URL = 'mongodb://localhost:27017/node-test-wrapper-es6-basic';

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connect = (callback = null) => {
  return mongoose.connect(MONGO_URL, options, callback);
};

const disconnect = (callback = null) => {
  return mongoose.disconnect(callback);
};

export { connect, disconnect };
