export function extractLocale(request: Request): string {
	const acceptLanguage = request.headers.get('Accept-Language');
	if (!acceptLanguage) {
		return 'en';
	}

	const [locale] = acceptLanguage.split(',');
	return locale;
}
