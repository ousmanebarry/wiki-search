import { displaySearches, displayErr, pagesDisplay } from './displayer.js';
import { pagesNumber, pagesEventListeners } from './pages.js';

const inputBox = document.getElementById('input-js');
const formSubmit = document.getElementById('form-js');
const pagesList = document.getElementById('pages-display');
const showResults = document.getElementById('results-search');
const loadingIndicator = document.getElementById('circle-sk');

inputBox.value = '';
pagesList.classList.add('hidden');

function fetchAndDisplay(url, start = 0, end = 25) {
	showResults.innerHTML = '';
	pagesList.innerHTML = '';
	loadingIndicator.classList.add('sk-circle');
	loadingIndicator.classList.remove('hidden');

	fetch(url)
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			return data.query.search;
		})
		.then((search) => {
			if (search.length == 0) {
				displayErr(1, inputBox.value, showResults);
			} else {
				localStorage.clear();
				localStorage.setItem('search', JSON.stringify(search));

				for (let i = start; i < end; i++) {
					displaySearches(search[i], showResults);
				}
				pagesDisplay(pagesNumber(search), pagesList);
				pagesEventListeners();
				document.getElementById(`${end / 25}`).classList.add('active');
			}
			return search;
		})
		.catch((error) => {
			displayErr(0, inputBox.value, showResults);
			console.error(error);
			return error;
		})
		.finally(() => {
			loadingIndicator.classList.add('hidden');
			loadingIndicator.classList.remove('sk-circle');
			pagesList.classList.remove('hidden');
		});
}

function handleSubmit(e) {
	e.preventDefault();
	const searchTerm = encodeURIComponent(inputBox.value);
	const url = `https://en.wikipedia.org/w/api.php?origin=*&action=query&list=search&srsearch=${searchTerm}&format=json&srlimit=200`;
	return fetchAndDisplay(url);
}

export function localStorageDisplay(e) {
	showResults.innerHTML = '';
	loadingIndicator.classList.add('sk-circle');
	loadingIndicator.classList.remove('hidden');

	const num = parseInt(e.target.id);
	const localData =
		JSON.parse(localStorage.getItem('search')) || handleSubmit(e);
	const ulPage = document.getElementById('test');
	const lastPage = ulPage.childElementCount;

	window.scrollTo(0, 0);

	if (num === lastPage) {
		for (let i = num * 25 - 25; i < localData.length; i++) {
			displaySearches(localData[i], showResults);
		}
	} else {
		for (let i = num * 25 - 25; i < num * 25; i++) {
			displaySearches(localData[i], showResults);
		}
	}

	pagesDisplay(pagesNumber(localData), pagesList);
	pagesEventListeners();
	document.getElementById(`${(num * 25) / 25}`).classList.add('active');

	loadingIndicator.classList.add('hidden');
	loadingIndicator.classList.remove('sk-circle');
	pagesList.classList.remove('hidden');
}

formSubmit.addEventListener('submit', handleSubmit);
