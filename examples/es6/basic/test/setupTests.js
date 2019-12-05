import mongoose from 'mongoose';
import { connect, disconnect } from '../src/db';

beforeAll(async () => {
  await connect();
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await disconnect();
});
