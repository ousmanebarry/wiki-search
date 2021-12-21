const showResults = document.getElementById("results-search");
const formSubmit = document.getElementById("form-js");
const inputBox = document.getElementById("input-js");

function fetchData(url) {
	fetch(url)
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			return data.query.search;
		})
		.then((search) => {
			let code = "";
			if (search.length == 0) {
				code = `<div><h1 class="red-light">"${inputBox.value}" could not be found. Please enter a valid search term.</h1></div>`;
				console.log("we got in here");
			} else {
				for (i = 0; i < search.length; i++) {
					code += `
                <div>
                <h1>
					<a
						href="https://en.wikipedia.org/?curid=${search[i].pageid}"
						target="_blank"
						rel="noopener noreferrer"
						class="first-a"
						>${search[i].title}</a
					>
				</h1>
                
                <p class="link">
					<a
						href="https://en.wikipedia.org/?curid=${search[i].pageid}"
						target="_blank"
						rel="noopener noreferrer"
						class="second-a"
						>https://en.wikipedia.org/?curid=${search[i].pageid}</a
					>
				</p>
                
                <p class="paragraph">
					${search[i].snippet}
				</p>
                </div>`;
				}
			}

			showResults.innerHTML = code;
			return search;
		})
		.catch((error) => {
			showResults.innerHTML = `<div><h1 class="red-light">There was an error fetching the data, please try again.</h1></div>`;
			return error;
		});
}

function handleSubmit(e) {
	e.preventDefault();
	const searchTerm = inputBox.value.replace(/ /g, "%20");
	const url = `https://en.wikipedia.org/w/api.php?origin=*&action=query&list=search&srsearch=${searchTerm}&format=json`;
	fetchData(url);
}

formSubmit.addEventListener("submit", handleSubmit);
