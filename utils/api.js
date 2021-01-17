const axios = require('axios');
const inquirer = require('inquirer');

// Object to hold API calls
module.exports = {
	getRepoNames: async username => {
		let hasAccount;
		let restart;

		let repoNames = await axios
			.get(`https://api.github.com/users/${username}/repos`)
			.then(response => {
				hasAccount = true;

				// Initializing array with an option to not include a repo name
				let namesArr = ['N/A'];

				response.data.map(repo => namesArr.push(repo.name));

				return namesArr;
			})
			.catch(async error => {
				if (error) {
					hasAccount = false;

					console.log('\n Something went wrong... \n');
					console.log(
						'\n Please create a GitHub account to get the most out of this program. \n'
					);
					await inquirer
						.prompt([
							{
								type: 'list',
								message: 'What would you like to do?',
								choices: [
									'Continue without a GitHub account',
									'Enter my GitHub username again'
								],
								name: 'resume'
							}
						])
						.then(res => {
							res.resume === 'Enter my GitHub username again'
								? (restart = true)
								: (restart = false);
						});
				}
			});

		// If the user has an account return their repo names
		if (hasAccount) {
			return repoNames;
		}
		// Handling whether they want to restart with the correct GitHub username or continue without
		if (restart) {
			return 'restart';
		} else {
			return ['N/A'];
		}
	},
	getLicenses: async () => {
		let licenses = await axios.get(`https://api.github.com/licenses`).then(response => response.data);

		licenses = licenses.map(license => license.name);

		return licenses;
	}
};
