#!/usr/bin/env node

import { select } from '@inquirer/prompts';

(async () => {
  const answer = await select({
    message: 'What do you want to create?',
    choices: [
      {
        value: 'project',
        description: 'Create a new project',
      },
      {
        value: 'resource',
        description: 'Create a new resource in the current project',
      },
      {
        value: 'cancel',
        description: 'Exit the program',
      },
    ],
  });

  if (answer === 'project') {
    (await import('./project/main.js')).default();
  } else if (answer === 'resource') {
    console.log('Not implemented yet');
  } else {
    console.log('Goodbye!');
  }
})();
