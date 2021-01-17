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
		console.log('\n Your README.md was successfully created!');
		console.log('\n Open the output folder to view your document. \n');
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

	// Uses username to gather repo data. If they are not a user, they will be given the option to reenter their username or continue with a username
	let repoNames = await API.getRepoNames(username);

	// If there was an issue with their username and they would like to restart the program
	if (repoNames === 'restart') {
		await init();

		return; // ensures the program ends after resolving the init function
	}

	const { repo } = await inquirer.prompt([
		{
			type: 'list',
			message: 'Which GitHub repo are you creating this README for?',
			choices: repoNames,
			name: 'repo'
		}
	]);

	// Prompts user to choose a Repo

	// Gathers remaining project info
	const projectRes = await getProjectDetails();

	// Builds markdown file
	const markdown = await generateMarkdown(projectRes, username, repo);

	// Writes file to output directory
	writeToFile('output/README.md', markdown);
}

init();
