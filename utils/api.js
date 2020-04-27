const axios = require('axios');
const inquirer = require('inquirer');

// Function that gets user email and avatar
const getUserInfo = (url) => {
	axios.get(url).then((response) => {
		const userEmail =
			response.data[0].payload.commits[0].author.email;
		const avatarURL = response.data[0].actor.avatar_url;

		console.log(userEmail, avatarURL);
	});
};

// Prompts user for github username
// Makes call to github api
const api = {
	getUser(username) {
		inquirer.prompt({
			message: 'What is your GitHub username?',
			name: 'username',
		}).then(({ username }) => {
			const queryURL = `https://api.github.com/users/${username}/events/public`;

			// Calling function using queryURL as parameter
			getUserInfo(queryURL);
		});
	},
};

module.exports = api;
