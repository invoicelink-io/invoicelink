import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

TimeAgo.addDefaultLocale(en);

export function formatTimeAgo(time: Date): string {
	const timeAgo = new TimeAgo('en-ZA');
	return timeAgo.format(time);
}
