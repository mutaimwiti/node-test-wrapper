import inquire from './inquirer';
import { copyTemplate } from './utils/file';
import { logInfo, logSuccess, logWarning } from './utils/message';

const run = () => {
  logInfo('App test wrapper interactive CLI');

  inquire()
    .then((response) => {
      copyTemplate(response);
      logSuccess('The wrapper was created generated successfully');
    })
    .catch((error) => {
      logWarning(
        `An error occurred and the wrapper was not generated. Details:\n\n${error}`,
      );
    });
};

export default run;
