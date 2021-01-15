function generateTableOfContents(sectionTitles) {
	let tableOfContents = ``;
	let num = 1;
	sectionTitles.map(title => {
		tableOfContents += `${num}. [${title}](#${title}) \n`;
		num++;
	});

	return tableOfContents;
}

async function generateMarkdown(project, username, repo) {
	return `# ${project.title}

${project.description}

## Table of Contents

${generateTableOfContents(['Installation', 'Usage', 'License', 'Contributing', 'Tests', 'Questions'])}

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
