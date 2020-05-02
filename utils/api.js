const fs = require('fs');
const axios = require('axios');

const api = {
  getUser(username) {
    axios
      .get(`https://api.github.com/users/${username}`)
      .then((response) => {
        let userEmail = response.data.email;
        let avatarURL = response.data.avatar_url;

        if (userEmail === null) userEmail = '';

        const gitHubData = `
Please send questions to: ${userEmail}
![GitHub Avatar](${avatarURL})`;

        fs.appendFile('yourReadMe.md', gitHubData, 'utf8', (error) => {
          if (error) throw error;
        });
      })
      .catch((error) => {
        if (error) throw error;
      });
  }
};

module.exports = api;
