import { input, select } from '@inquirer/prompts';
import { execSync } from 'node:child_process';
import os from 'node:os';

export default async function main() {
  const project = await select({
    message: 'Choose a project',
    choices: [
      {
        name: 'node-ts',
        value: JSON.stringify({
          repoURL: 'https://github.com/marcelo-michels/node-ts.git',
          repoName: 'node-ts',
        }),
        description: 'Create a basic Node.js project with TypeScript',
      },
      {
        value: 'cancel',
        description: 'Exit the program',
      },
    ],
  });

  if (project === 'cancel') {
    process.exit(0);
  }

  const { repoURL, repoName } = JSON.parse(project);

  const projectName = await input({
    message: 'Enter project name',
    default: 'my-project',
  });

  execSync(`git clone ${repoURL} ${projectName}`);

  const sedCommand =
    os.type() === 'Darwin'
      ? `sed -i '' 's/${repoName}/${projectName}/g'`
      : `sed -i 's/${repoName}/${projectName}/g'`;

  execSync(
    `cd ${projectName} && ${sedCommand} package*.json && ${sedCommand} README.md`,
  );

  execSync(
    `cd ${projectName} && rm -rf .git && git init && git add . && git commit -m "Initial commit"`,
  );

  execSync(`cd ${projectName} && npm i`);

  console.log('Project created successfully!');

  execSync(`cd ${projectName} && code .`);
}
