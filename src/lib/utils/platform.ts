export function isAppleMobile(userAgent: string) {
	return userAgent.match(/(iPad|iPhone)/i) ? true : false;
}

export function followUrl(url: string, newTab = false) {
	if (newTab) {
		window.open(url, '_blank');
	} else {
		window.open(url, '_self');
	}
}
