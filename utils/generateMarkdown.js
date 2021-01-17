function generateTableOfContents(sectionTitles) {
	var tableOfContents = ``;
	var num = 1;
	sectionTitles.map(title => {
		tableOfContents += `${num}. [${title}](#${title}) \n`;
		num++;
	});

	return tableOfContents;
}

function generateSections(data, username, repo) {
	var md = ``;
	data.map(section => {
		if (section.title === 'License') {
			md += `## ${section.title}  <img src="https://img.shields.io/github/license/${username}/${repo}" alt="Repo License Badge"> \n \n`;
			md += `${section.data} \n`;
		} else {
			md += `## ${section.title} \n \n`;
			md += `${section.data} \n \n`;
		}
	});
	return md;
}

async function generateMarkdown(project, username, repo) {
	var sectionTitles = [];

	project.sectionData.map(section => sectionTitles.push(section.title));

	var allTitlesArr = sectionTitles.concat(['Contributing', 'Issues']);

	return `# ${project.title}

${project.description}

## Table of Contents

${generateTableOfContents(allTitlesArr)}
${generateSections(project.sectionData, username, repo)}
## Contributing

1. [Fork](https://github.com/${username}/${repo})
2. [Pull Requests](https://github.com/${username}/${repo}/pulls)
3. Clone:

${'```'}
git clone git@github.com:${username}/${repo}.git
${'```'}

## Issues

Questions, Concerns, Ideas, Feedback? Please send them **[here](https://github.com/${username}/${repo}/issues)**.
	`;
}

// Exporting function
module.exports = generateMarkdown;
