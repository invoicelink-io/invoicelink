import { handleErrorWithSentry } from '@sentry/sveltekit';
import * as Sentry from '@sentry/sveltekit';

Sentry.init({
	dsn: 'https://83a0ee55052968dcb8b31d9fea069608@o4506575806398464.ingest.sentry.io/4506575811903488',
	tracesSampleRate: 1.0
});

// If you have a custom error handler, pass it to `handleErrorWithSentry`
export const handleError = handleErrorWithSentry();
