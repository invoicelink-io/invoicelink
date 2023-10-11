// prisma/seed.ts

import { PrismaClient } from '@prisma/client';

const userData = [
	{
		author: {
			name: 'Ratul Maharaj',
			email: 'ratulmaharaj@gmail.com'
		}
	}
];
const prisma = new PrismaClient();

async function main() {
	console.log(`Start seeding ...`);

	for (const p of userData) {
		const user = await prisma.user.create({
			data: {
				name: p.author.name,
				email: p.author.email
			}
		});
		console.log(`Created user with id: ${user.id}`);
	}
	console.log(`Seeding finished.`);
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
