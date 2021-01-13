const axios = require('axios');

// Object to hold API calls
module.exports = {
	async getRepoNames(username) {
		const repoNames = await axios
			.get(`https://api.github.com/users/${username}/repos`)
			.then(response => {
				// Initializing array with an option to not include a repo name
				let namesArr = ['N/A'];

				response.data.map(repo => namesArr.push(repo.name));

				return namesArr;
			})
			.catch(error => {
				if (error) throw error;
			});

		return repoNames;
	}
};
