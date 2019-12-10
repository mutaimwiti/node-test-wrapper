import { Schema, model } from 'mongoose';

const UserSchema = Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

export default model('User', UserSchema);
