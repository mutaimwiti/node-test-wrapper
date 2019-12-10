import { User, Report, Article } from '../src/models';

import { connect, disconnect } from '../src/db';
import { mockUsers, mockReports, mockArticles } from './mockData';

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
