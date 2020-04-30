const fs = require('fs');
const inquirer = require('inquirer');
const api = require('./utils/api');
const generateMarkdown = require('./utils/generateMarkdown');

const questions = [
  {
    type: 'input',
    message: 'What is your GitHub username?',
    name: 'username'
  },
  {
    type: 'input',
    message: 'What is this projects repository name on GitHub?',
    name: 'repo'
  },
  {
    type: 'input',
    message: 'What is the title of your project?',
    name: 'title'
  },
  {
    type: 'input',
    message: 'Please write a brief description of your project...',
    name: 'description'
  },
  {
    type: 'input',
    message: 'Installation?',
    name: 'installation'
  },
  {
    type: 'input',
    message: 'Usage?',
    name: 'usage'
  },
  {
    type: 'input',
    message: 'License?',
    name: 'license'
  },
  {
    type: 'input',
    message: 'Contributing?',
    name: 'contributing'
  },
  {
    type: 'input',
    message: 'Tests?',
    name: 'tests'
  }
];

function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, 'utf8', (error) => {
    if (error) throw error;
    console.log('Your README.md was successfully created!');
  });
}

async function init() {
  const userInput = await inquirer.prompt(questions);

  await writeToFile('README.md', generateMarkdown(userInput));

  await api.getUser(userInput.username);
}

init();
