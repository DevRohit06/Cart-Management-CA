import { writable } from 'svelte/store';

let initialTheme = 'light';
if (typeof window !== 'undefined') {
	// Get the initial theme from localStorage or default to 'light'
	initialTheme = localStorage.getItem('theme') || 'light';
}

// Create the writable store with the initial theme
export const theme = writable(initialTheme);

// Subscribe to changes in the theme and save them to localStorage
theme.subscribe((value) => {
	// Check if localStorage is available before trying to use it
	if (typeof window !== 'undefined') {
		localStorage.setItem('theme', value);
	}
});
