export function isAppleMobile(userAgent: string) {
	return userAgent.match(/(iPad|iPhone)/i) ? true : false;
}

export function openInNewTab(url: string) {
	window.open(url, '_blank');
}
