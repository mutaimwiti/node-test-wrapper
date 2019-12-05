import app from './src/app';
import { connect } from './src/db';

(async () => {
  await connect();
})();

app.listen(3000, function() {
  console.log('Listening on http://localhost:3000');
});
