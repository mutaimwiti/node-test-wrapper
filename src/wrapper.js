import inquire from './inquirer';
import { copyTemplate } from './utils/file';
import { logInfo, logSuccess, logWarning } from './utils/message';

const run = () => {
  logInfo('App wrapper interactive CLI');

  inquire()
    .then((response) => {
      copyTemplate(response);
      logSuccess('The wrapper was created generated successfully');
    })
    .catch(() => {
      logWarning(
        'Something went wrong - the wrapper was not generated. Please try again...',
      );
    });
};

export default run;
