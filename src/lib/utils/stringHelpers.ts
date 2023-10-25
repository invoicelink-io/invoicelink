export function getInitials(name: string) {
	const initials = name.split(' ');
	if (initials) {
		if (initials.length === 1) return initials[0].charAt(0);

		const firstInitial = initials[0].charAt(0);
		const lastInitial = initials[initials.length - 1].charAt(0);

		return `${firstInitial}${lastInitial || ''}`;
	}
	return '';
}

export function capitalizeFirstLetter(string: string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}
