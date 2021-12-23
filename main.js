import {
	displaySearches,
	displayNoResults,
	displayFetchErr,
} from "./createHtml.js";

const showResults = document.getElementById("results-search");
const formSubmit = document.getElementById("form-js");
const inputBox = document.getElementById("input-js");
const loadingIndicator = document.getElementById("circle-sk");

function fetchAndDisplay(url) {
	showResults.innerHTML = "";
	loadingIndicator.classList.add("sk-circle");
	loadingIndicator.classList.remove("hidden");

	fetch(url)
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			return data.query.search;
		})
		.then((search) => {
			if (search.length == 0) {
				displayNoResults(inputBox.value, showResults);
			} else {
				for (let i = 0; i < search.length; i++) {
					displaySearches(search[i], showResults);
				}
			}

			return search;
		})
		.catch((error) => {
			displayFetchErr(showResults);
			return error;
		})
		.finally(() => {
			loadingIndicator.classList.add("hidden");
			loadingIndicator.classList.remove("sk-circle");
		});
}

function handleSubmit(e) {
	e.preventDefault();
	const searchTerm = encodeURIComponent(inputBox.value);
	const url = `https://en.wikipedia.org/w/api.php?origin=*&action=query&list=search&srsearch=${searchTerm}&format=json&srlimit=25`;
	fetchAndDisplay(url);
}

formSubmit.addEventListener("submit", handleSubmit);
