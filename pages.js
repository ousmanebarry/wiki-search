import { localStorageDisplay } from "./main.js";

export function pagesNumber(search) {
	if (search.length >= 200) {
		return 8;
	} else if (search.length > 25 && search.length < 200) {
		return Math.ceil(search.length / 25);
	} else {
		return 1;
	}
}

export function pagesEventListeners() {
	const a1 = document.getElementById("1");
	const a2 = document.getElementById("2");
	const a3 = document.getElementById("3");
	const a4 = document.getElementById("4");
	const a5 = document.getElementById("5");
	const a6 = document.getElementById("6");
	const a7 = document.getElementById("7");
	const a8 = document.getElementById("8");

	if (a1 != null) {
		a1.addEventListener("click", localStorageDisplay);
	}
	if (a2 != null) {
		a2.addEventListener("click", localStorageDisplay);
	}
	if (a3 != null) {
		a3.addEventListener("click", localStorageDisplay);
	}
	if (a4 != null) {
		a4.addEventListener("click", localStorageDisplay);
	}
	if (a5 != null) {
		a5.addEventListener("click", localStorageDisplay);
	}
	if (a6 != null) {
		a6.addEventListener("click", localStorageDisplay);
	}
	if (a7 != null) {
		a7.addEventListener("click", localStorageDisplay);
	}
	if (a8 != null) {
		a8.addEventListener("click", localStorageDisplay);
	}
}
