import inquire from './inquirer';
import { copyTemplate } from './utils/file';
import { logInfo, logSuccess, logWarning } from './utils/message';

const run = () => {
  logInfo('Supertest wrapper interactive CLI');

  inquire()
    .then((response) => {
      copyTemplate(response);
      logSuccess('The supertest wrapper was created generated successfully');
    })
    .catch(() => {
      logWarning('Something went wrong - the wrapper was not generated. Please try again...');
    });
};

export default run;
