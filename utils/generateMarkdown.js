const api = require('./api');

function generateMarkdown(data) {
  return `
# ${data.title}

${data.description}

## Table of Contents

1. Installation
2. Usage
3. License
4. Contributing
5. Tests
6. Questions

[![GitHub version](https://badge.fury.io/gh/${data.username}%2F${data.repo}.svg)](https://github.com/${data.username}/${data.repo})

## Installation

${data.installation}

## Usage

${data.usage}

## License 

${data.license}

## Contributing

1. [Fork](https://github.com/${data.username}/${data.repo})
2. [Pull Requests](https://github.com/${data.username}/${data.repo}/pulls)
3. Clone: git@github.com:${data.username}/${data.repo}.git

## Tests

${data.tests}

## Questions
`;
}

module.exports = generateMarkdown;
