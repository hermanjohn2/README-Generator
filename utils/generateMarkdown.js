async function generateMarkdown(project, username, repo) {
	return `# ${project.title}

${project.description}

## Table of Contents

1. Installation
2. Usage
3. License
4. Contributing
5. Tests
6. Questions


## Installation

${project.installation}

## Usage

${project.usage}

## License 

${project.license}


## Contributing

1. [Fork](https://github.com/${username}/${repo})
2. [Pull Requests](https://github.com/${username}/${repo}/pulls)
3. Clone: 

${'```'}
git clone git@github.com:${username}/${repo}.git
${'```'}

## Tests

${project.tests}

## Issues

Questions, Concerns, Ideas, Feedback? Please send them **[here](https://github.com/${username}/${repo}/issues)**.
`;
}

// Exporting function
module.exports = generateMarkdown;
