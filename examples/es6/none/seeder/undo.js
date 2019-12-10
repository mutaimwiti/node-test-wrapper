import { Article, Report } from '../src/models';
import { connect, disconnect } from '../src/db';

const undo = async () => {
  console.log('=============== Clearing database ===============');
  await Article.deleteMany();
  await Report.deleteMany();
  console.log('============= Cleared successfully ==============');
  process.exit(0);
};

connect(async () => {
  await undo();
  disconnect();
});
