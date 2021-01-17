const inquirer = require('inquirer');

const API = require('./api');

// This is a prompt helper function that will be driven by possible section titles
async function promptSection(title, dataArray) {
	let { hasSection } = await inquirer.prompt([
		{
			type: 'confirm',
			message: `Does your project need a ${title} section?`,
			name: 'hasSection'
		}
	]);

	if (hasSection) {
		let { section } = await inquirer.prompt([
			{
				type: 'input',
				message: `Please describe the ${title}:`,
				name: 'section'
			}
		]);

		dataArray.push({
			title: `${title}`,
			data: section
		});
	}
}

async function promptLicense(dataArray) {
	const licenses = await API.getLicenses();

	licenses.push('Other');

	let { hasLicense } = await inquirer.prompt([
		{
			type: 'confirm',
			message: 'Does your project have a License?',
			name: 'hasLicense'
		}
	]);

	if (hasLicense) {
		let { licenseName } = await inquirer.prompt([
			{
				type: 'list',
				message: 'Please select a license:',
				choices: licenses,
				name: 'licenseName'
			}
		]);

		const license = licenses.filter(license => license === licenseName)[0];

		dataArray.push({
			title: 'License',
			data: license
		});
	} else return;
}

// Object to hold prompts
module.exports = {
	username: [
		{
			type: 'input',
			message: 'What is your GitHub username?',
			name: 'username'
		}
	],
	getProjectDetails: async () => {
		let { title, description } = await inquirer.prompt([
			{
				type: 'input',
				message: 'What is the title of your project?',
				name: 'title'
			},
			{
				type: 'input',
				message: 'Please write a brief description of your project:',
				name: 'description'
			}
		]);

		// Add new sections here
		const possibleSections = ['Installation', 'Usage', 'Tests'];

		let sectionData = [];

		// Looping through possibleSections and prompting for user data which will build out our sectionData array
		for (const section of possibleSections) {
			await promptSection(section, sectionData);
		}

		await promptLicense(sectionData);

		return {
			title: title,
			description: description,
			sectionData: sectionData
		};
	}
};
