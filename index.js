// Packages
const fs = require('fs');
const inquirer = require('inquirer');
const api = require('./utils/api');
const generateMarkdown = require('./utils/generateMarkdown');

// Questions Array...
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

// Function that writes a file using fs
function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, 'utf8', (error) => {
    if (error) throw error;
    console.log('yourReadMe.md was successfully created!');
  });
}

// Init function that runs when application is started
async function init() {
  // Inquirer Prompt
  const userInput = await inquirer.prompt(questions);

  // GitHub API call
  api.getUser(userInput.username);

  // Markdown Generator
  const markdown = generateMarkdown(userInput);

  // Writes .md file with provided markdown
  writeToFile('yourReadMe.md', markdown);
}

init();
