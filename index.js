// Packages
const fs = require('fs');
const inquirer = require('inquirer');

const getProjectDetails = require('./utils/getProjectDetails');
const API = require('./utils/api');
const generateMarkdown = require('./utils/generateMarkdown');

// Function that writes a file using fs
function writeToFile(fileName, data) {
	fs.writeFile(fileName, data, 'utf8', error => {
		if (error) throw error;
		console.log('Your README.md was successfully created!');
		console.log('Open the output folder to view your document.');
	});
}

// Init function that runs when application is started
async function init() {
	// Get Username
	const { username } = await inquirer.prompt([
		{
			type: 'input',
			message: 'What is your GitHub username?',
			name: 'username'
		}
	]);

	// Gathers user repo names
	const repoNames = await API.getRepoNames(username);

	// Prompts user to choose a Repo
	const { repo } = await inquirer.prompt([
		{
			type: 'list',
			message: 'Which GitHub repo are you creating this README for?',
			choices: repoNames,
			name: 'repo'
		}
	]);

	// Gathers remaining project info
	const projectRes = await getProjectDetails();

	// Builds markdown file
	const markdown = await generateMarkdown(projectRes, username, repo);

	// Writes file to output directory
	writeToFile('output/README.md', markdown);
}

init();
