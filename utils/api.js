const axios = require('axios');

// Object to hold API calls
module.exports = {
	getRepoNames: async username => {
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
	},
	getLicenses: async () => {
		let licenses = await axios.get(`https://api.github.com/licenses`).then(response => response.data);

		licenses = licenses.map(license => license.name);

		return licenses;
	}
};
