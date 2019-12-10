import { connect } from '../../src/db';

let connection;

beforeAll(async () => {
  connection = await connect();
});

afterAll(async () => {
  await connection.disconnect();
});
