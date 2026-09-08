import { DateTime } from "luxon";
import { transform } from "lightningcss";

export default function(eleventyConfig) {
	eleventyConfig.addFilter("readableDate", (dateObj, format, zone) => {
		// Formatting tokens for Luxon: https://moment.github.io/luxon/#/formatting?id=table-of-tokens
		return DateTime.fromJSDate(dateObj, { zone: zone || "utc" }).toFormat(format || "dd LLLL yyyy");
	});

	eleventyConfig.addFilter("htmlDateString", (dateObj) => {
		// dateObj input: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
		return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat('yyyy-LL-dd');
	});

	// Get the first `n` elements of a collection.
	eleventyConfig.addFilter("head", (array, n) => {
		if(!Array.isArray(array) || array.length === 0) {
			return [];
		}
		if( n < 0 ) {
			return array.slice(n);
		}

		return array.slice(0, n);
	});

	// Return the smallest number argument
	eleventyConfig.addFilter("min", (...numbers) => {
		return Math.min.apply(null, numbers);
	});

	// Return the keys used in an object
	eleventyConfig.addFilter("getKeys", target => {
		return Object.keys(target);
	});

	eleventyConfig.addFilter("filterTagList", function filterTagList(tags) {
		return (tags || []).filter(tag => ["all", "posts", "featuredPublications"].indexOf(tag) === -1);
	});

	// Minify a CSS string with Lightning CSS. The site inlines its stylesheet
	// into every page rather than linking it, so minification has to happen on
	// the string being inlined — a plugin that compiles `.css` files into
	// output files never sees it.
	eleventyConfig.addFilter("cssmin", (code) => {
		if (!code) {
			return "";
		}

		// Minify only, with no browser targets: transpiling could rewrite or drop
		// the hand-written fallback pairs in this stylesheet (100vh before
		// 100dvh, 100vh before 100svh), which are there on purpose.
		let { code: minified } = transform({
			filename: "inline.css",
			code: Buffer.from(code),
			minify: true,
		});

		return minified.toString();
	});

	eleventyConfig.addFilter("sortAlphabetically", strings =>
		(strings || []).sort((b, a) => b.localeCompare(a))
	);

	// Bold the site owner inside a comma-separated author list, so a reader
	// scanning the publication list can spot his position in each byline.
	eleventyConfig.addFilter("highlightAuthor", (authors, surname = "Battisti") => {
		if(!authors) {
			return "";
		}

		return authors
			.split(",")
			.map(name => {
				let trimmed = name.trim();
				return trimmed.includes(surname) ? `<span class="me">${trimmed}</span>` : trimmed;
			})
			.join(", ");
	});

	// "magazine" is how publications are tagged in front matter; "Journal" is
	// what the reader expects to see next to the venue.
	eleventyConfig.addFilter("publicationKind", tags => {
		return (tags || []).includes("magazine") ? "Journal" : "Conference";
	});
};
