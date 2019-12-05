import { User, Report, Article } from '../models';
import { mockUsers, mockReports, mockArticles } from '../__mock__';
import { connect, disconnect } from '../db';

console.log(User);

const seed = async () => {
  console.log('=============== Clearing database ===============');
  await User.deleteMany();
  await Report.deleteMany();
  await Article.deleteMany();
  console.log('============= Cleared successfully ==============');
  console.log('================ Seeding database ===============');
  await User.insertMany(mockUsers);
  await Report.insertMany(mockReports);
  await Article.insertMany(mockArticles);
  console.log('============== Seeded successfully ==============');
  process.exit(0);
};

connect(async () => {
  await seed();
  disconnect();
});
