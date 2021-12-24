export function displaySearches(search, showResults) {
	const p1Class = document.createAttribute("class");
	const p2Class = document.createAttribute("class");
	const newDiv = document.createElement("div");
	const h1 = document.createElement("h1");
	const a1 = document.createElement("a");
	const a2 = document.createElement("a");
	const p1 = document.createElement("p");
	const p2 = document.createElement("p");

	const a1Attributes = {
		href: `https://en.wikipedia.org/?curid=${search.pageid}`,
		target: "_blank",
		rel: "noopener noreferrer",
		class: "first-a",
	};

	const a2Attributes = {
		href: `https://en.wikipedia.org/?curid=${search.pageid}`,
		target: "_blank",
		rel: "noopener noreferrer",
		class: "second-a",
	};

	Object.keys(a1Attributes).forEach((key) => {
		const att = document.createAttribute(key);
		att.value = a1Attributes[key];
		a1.setAttributeNode(att);
	});

	Object.keys(a2Attributes).forEach((key) => {
		const att = document.createAttribute(key);
		att.value = a2Attributes[key];
		a2.setAttributeNode(att);
	});

	a1.appendChild(document.createTextNode(`${search.title}`));
	a2.appendChild(
		document.createTextNode(`https://en.wikipedia.org/?curid=${search.pageid}`)
	);

	h1.appendChild(a1);

	p1Class.value = "link";
	p2Class.value = "paragraph";
	p1.setAttributeNode(p1Class);
	p2.setAttributeNode(p2Class);

	p1.appendChild(a2);
	p2.innerHTML = `${search.snippet}`;

	newDiv.appendChild(h1);
	newDiv.appendChild(p1);
	newDiv.appendChild(p2);

	showResults.appendChild(newDiv);
}

export function displayErr(errType, value, showResults) {
	const newDiv = document.createElement("div");
	const h1 = document.createElement("h1");
	const att = document.createAttribute("class");

	att.value = "red-light";
	h1.setAttributeNode(att);

	if (Boolean(errType)) {
		h1.appendChild(
			document.createTextNode(
				`No results were found for "${value}". Please enter a valid search term.`
			)
		);
	} else {
		h1.appendChild(
			document.createTextNode(
				"There was an error fetching the data, please try again."
			)
		);
	}

	newDiv.appendChild(h1);
	showResults.appendChild(newDiv);
}
