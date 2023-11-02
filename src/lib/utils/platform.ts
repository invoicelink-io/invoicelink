export function isAppleMobile(userAgent: string) {
	return userAgent.match(/(iPad|iPhone)/i) ? true : false;
}
