const fs = require('fs');
const axios = require('axios');

const api = {
  getUser(username) {
    axios
      .get(`https://api.github.com/users/${username}/events/public`)
      .then((response) => {
        const userEmail = response.data[0].payload.commits[0].author.email;
        const avatarURL = response.data[0].actor.avatar_url;

        const gitHubData = `${userEmail}
         ![GitHub Avatar](${avatarURL})`;

        fs.appendFile('README.md', gitHubData, 'utf8', (error) => {
          if (error) throw error;
        });
      })
      .catch((error) => {
        if (error) throw error;
      });
  }
};

module.exports = api;
