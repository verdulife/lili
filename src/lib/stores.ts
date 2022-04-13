import { browser } from '$app/env';
import { writable } from 'svelte/store';

const defaultTheme = 'light';

export const _clients = writable([]);

export const AuthStore = writable((browser && JSON.parse(localStorage.getItem('AuthStore'))) || {});

export const ThemeStore = writable(
	(browser && JSON.parse(localStorage.getItem('ThemeStore'))) || defaultTheme
);

AuthStore.subscribe((val) => browser && (localStorage.AuthStore = JSON.stringify(val)));
ThemeStore.subscribe((val) => browser && (localStorage.ThemeStore = JSON.stringify(val)));
