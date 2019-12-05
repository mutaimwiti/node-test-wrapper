import { User } from '../models';
import { connect, disconnect } from '../db';

const undo = async () => {
  console.log('=============== Clearing database ===============');
  await User.deleteMany();
  console.log('============= Cleared successfully ==============');
  process.exit(0);
};

connect(async () => {
  await undo();
  disconnect();
});
