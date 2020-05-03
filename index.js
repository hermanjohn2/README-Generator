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
    message: 'What is your projects repository name on GitHub?',
    name: 'repo'
  },
  {
    type: 'input',
    message: 'What is the title of your project?',
    name: 'title'
  },
  {
    type: 'input',
    message: 'Please write a brief description of your project:',
    name: 'description'
  },
  {
    type: 'input',
    message:
      'Please write a decription of the installation process of your project:',
    name: 'installation'
  },
  {
    type: 'input',
    message: 'Please write a description of how to use your project:',
    name: 'usage'
  },
  {
    type: 'input',
    message: 'Please provide the license information of your project:',
    name: 'license'
  },
  {
    type: 'input',
    message: 'Please write a description of how to test your project:',
    name: 'tests'
  }
];

function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, 'utf8', (error) => {
    if (error) throw error;
    console.log('yourReadMe.md was successfully created!');
  });
}

async function init() {
  const userInput = await inquirer.prompt(questions);
  const markdown = await generateMarkdown(userInput);

  await writeToFile('yourReadMe.md', markdown);

  await api.getUser(userInput.username);
}

init();
