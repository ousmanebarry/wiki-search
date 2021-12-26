export function displaySearches(search, showResults) {
	const newDiv = document.createElement("div");
	const h1 = document.createElement("h1");
	const a1 = document.createElement("a");
	const a2 = document.createElement("a");
	const p1 = document.createElement("p");
	const p2 = document.createElement("p");

	const aAttributes = {
		href: `https://en.wikipedia.org/?curid=${search.pageid}`,
		target: "_blank",
		rel: "noopener noreferrer",
		class: ["first-a", "second-a"],
	};

	Object.keys(aAttributes).forEach((key) => {
		if (key === "class") {
			a1.classList.add(aAttributes[key][0]);
			a2.classList.add(aAttributes[key][1]);
		} else {
			a1.setAttribute(key, aAttributes[key]);
			a2.setAttribute(key, aAttributes[key]);
		}
	});

	a1.appendChild(document.createTextNode(`${search.title}`));
	a2.appendChild(
		document.createTextNode(`https://en.wikipedia.org/?curid=${search.pageid}`)
	);

	p1.classList.add("link");
	p2.classList.add("paragraph");

	h1.appendChild(a1);
	p1.appendChild(a2);
	p2.innerHTML = `${search.snippet}`;

	newDiv.append(h1, p1, p2);

	showResults.appendChild(newDiv);
}

export function pagesDisplay(num, pagesList) {
	pagesList.innerHTML = "";
	if (num !== 1) {
		const ul = document.createElement("ul");

		for (let i = 0; i < num; i++) {
			const li = document.createElement("li");
			const a = document.createElement("a");

			a.textContent = i + 1;
			a.setAttribute("id", `${i + 1}`);
			li.appendChild(a);
			ul.appendChild(li);
		}

		pagesList.appendChild(ul);
	}
}

export function displayErr(errType, value, showResults) {
	const newDiv = document.createElement("div");
	const h1 = document.createElement("h1");

	h1.classList.add("red-light");

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
