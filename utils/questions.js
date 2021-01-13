module.exports = {
	username: [
		{
			type: 'input',
			message: 'What is your GitHub username?',
			name: 'username'
		}
	],
	projectDetails: [
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
			message: 'Please write a description of the installation process of your project:',
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
	]
};
