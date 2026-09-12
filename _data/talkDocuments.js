import fs from "node:fs";
import path from "node:path";

const TALKS_DIR = "content/talks";

/**
 * Files dropped into `content/talks/<slug>/` become the documents listed on the
 * talk whose Markdown file is named `<slug>.md`. Nothing has to be declared:
 * the folder is the source of truth, and front matter only supplies nicer
 * titles than a filename can carry.
 */
export default function () {
	const documents = {};

	if (!fs.existsSync(TALKS_DIR)) {
		return documents;
	}

	for (const entry of fs.readdirSync(TALKS_DIR, { withFileTypes: true })) {
		if (!entry.isDirectory()) {
			continue;
		}

		const folder = path.join(TALKS_DIR, entry.name);
		const files = fs
			.readdirSync(folder, { withFileTypes: true })
			.filter((file) => file.isFile() && !file.name.startsWith("."))
			.map((file) => ({
				file: file.name,
				url: `/talks/${entry.name}/${file.name}`,
				ext: path.extname(file.name).slice(1).toUpperCase(),
				bytes: fs.statSync(path.join(folder, file.name)).size,
			}))
			.sort((a, b) => a.file.localeCompare(b.file));

		if (files.length) {
			documents[entry.name] = files;
		}
	}

	return documents;
}
