function generateTableOfContents(sectionTitles) {
	var tableOfContents = ``;
	var num = 1;
	sectionTitles.map(title => {
		tableOfContents += `${num}. [${title}](#${title}) \n`;
		num++;
	});

	return tableOfContents;
}

function generateSections(data) {
	var md = ``;
	data.forEach(({ title, data }) => {
		md += `## ${title} \n \n`;
		md += `${data} \n \n`;
	});
	return md;
}

async function generateMarkdown(project, username, repo) {
	var sectionTitles = [];

	project.sectionData.forEach(section => sectionTitles.push(section.title));

	var allTitlesArr = [...sectionTitles, ...['Contributing', 'Issues']];

	return `# ${project.title}

${project.description}

${
	project.sectionData.filter(
		({ title, data }) => title === 'License' && data !== 'Other'
	)[0] && repo !== 'N/A'
		? `<img src="https://img.shields.io/github/license/${username}/${repo}" alt="Repo License Badge">`
		: ''
}

## Table of Contents

${generateTableOfContents(allTitlesArr)}
${generateSections(project.sectionData, username, repo)}

${
	repo !== 'N/A'
		? `
## Contributing

1. [Fork](https://github.com/${username}/${repo})
2. [Pull Requests](https://github.com/${username}/${repo}/pulls)
3. To clone, run the following command where you want to the project to exist:

${'```'}
git clone git@github.com:${username}/${repo}.git
${'```'}

## Issues

Questions, Concerns, Ideas, Feedback? Please send them **[here](https://github.com/${username}/${repo}/issues)**.
`
		: ''
}
	`;
}

// Exporting function
module.exports = generateMarkdown;
