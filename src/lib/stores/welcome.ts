import { writable } from 'svelte/store';
import type { WelcomeStore } from '$lib/types';

export const welcome = writable<WelcomeStore>({
	user: { id: '', name: '', username: '' },
	address: {
		line1: '',
		line2: '',
		line3: '',
		postalCode: ''
	},
	bankDetails: {
		accountHolder: '',
		accountNo: '',
		accountType: '',
		bankName: '',
		branchCode: ''
	}
});
