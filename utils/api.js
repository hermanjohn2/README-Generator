const fs = require('fs');
const axios = require('axios');

// API call to GitHub
const api = {
  getUser(username) {
    axios
      .get(`https://api.github.com/users/${username}`)
      .then((response) => {
        let userEmail = response.data.email;
        let avatarURL = response.data.avatar_url;

        // If issue obtaining email from API insert placeholder
        if (userEmail === null) userEmail = '[Your Email Here]';

        // Markdown to be appended to .md file
        const gitHubData = `
Please send questions to: ${userEmail}

![GitHub Avatar](${avatarURL})`;

        // Appending to the .md file
        fs.appendFile('yourReadMe.md', gitHubData, 'utf8', (error) => {
          if (error) throw error;
        });
      })
      .catch((error) => {
        if (error) throw error;
      });
  }
};

// Exporting API
module.exports = api;
