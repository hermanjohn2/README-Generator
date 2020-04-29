const axios = require('axios');

const api = {
  getUser(username) {
    axios
      .get(`https://api.github.com/users/${username}/events/public`)
      .then((response) => {
        const userEmail = response.data[0].payload.commits[0].author.email;
        const avatarURL = response.data[0].actor.avatar_url;

        return userEmail, avatarURL;
      })
      .catch((error) =>
        console.log(error, 'Please enter a valid GitHub username.')
      );
  }
};

module.exports = api;
