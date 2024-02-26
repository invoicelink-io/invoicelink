import { json } from '@sveltejs/kit';
import fs from 'fs';

export async function GET() {
	// read in the contents of the changelog file
	const changelog = fs.readFileSync('changelog.md', 'utf8');
	return json(changelog);
}
