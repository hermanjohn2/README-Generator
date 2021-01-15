const inquirer = require('inquirer');

// This is a flexible prompt that will be driven by possible section titles
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
		const possibleSections = ['Installation', 'Usage', 'License', 'Tests'];

		let sectionData = [];

		// Looping through possibleSections and prompting for user data which will build out our sectionData array
		for (const section of possibleSections) {
			await promptSection(section, sectionData);
		}

		return {
			title: title,
			description: description,
			sectionData: sectionData
		};
	}
};
