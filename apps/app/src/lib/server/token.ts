// import { prisma } from '$lib/server/prisma';
// import { Token } from '@invoicelink/db';
// import { generateRandomString, isWithinExpiration } from 'lucia/utils';

// const EXPIRES_IN = 1000 * 60 * 60 * 2; // 2 hours

// const generateVerificationToken = async (userId: string, type: Token) => {
// 	const storedUserTokens = await prisma.verificationToken.findMany({
// 		where: {
// 			user_id: userId
// 		}
// 	});
// 	if (storedUserTokens.length > 0) {
// 		const reusableStoredToken = storedUserTokens.find((token) => {
// 			// check if expiration is within 1 hour
// 			// and reuse the token if true
// 			return isWithinExpiration(Number(token.expires) - EXPIRES_IN / 2);
// 		});
// 		if (reusableStoredToken) return reusableStoredToken.id;
// 	}
// 	const token = generateRandomString(63);
// 	await prisma.verificationToken.create({
// 		data: {
// 			type: type,
// 			token: token,
// 			expires: new Date().getTime() + EXPIRES_IN,
// 			user_id: userId
// 		}
// 	});

// 	return token;
// };

// export const generateEmailVerificationToken = (userId: string) => {
// 	return generateVerificationToken(userId, Token.EMAIL);
// };

// export const generatePasswordResetToken = (userId: string) => {
// 	return generateVerificationToken(userId, Token.PASSWORD);
// };

// const validateVerificationToken = async (token: string, type: Token) => {
// 	// fetch the stored token
// 	const storedToken = await prisma.verificationToken.findFirst({
// 		where: {
// 			token: token,
// 			type: type
// 		}
// 	});
// 	// throw an error if the token is invalid
// 	if (!storedToken) {
// 		throw new Error('Invalid token');
// 	}
// 	// delete the token
// 	await prisma.verificationToken.delete({
// 		where: {
// 			id: storedToken.id
// 		}
// 	});
// 	// check if the token is expired
// 	const tokenExpires = Number(storedToken.expires); // bigint => number conversion
// 	if (!isWithinExpiration(tokenExpires)) {
// 		throw new Error('Expired token');
// 	}
// 	return storedToken.user_id;
// };

// export const validateEmailVerificationToken = (token: string) => {
// 	return validateVerificationToken(token, Token.EMAIL);
// };

// export const validatePasswordResetToken = (token: string) => {
// 	return validateVerificationToken(token, Token.PASSWORD);
// };

// export const isValidPasswordResetToken = async (token: string) => {
// 	const storedToken = await prisma.verificationToken.findFirst({
// 		where: {
// 			token: token
// 		}
// 	});
// 	if (!storedToken) return false;
// 	const tokenExpires = Number(storedToken.expires); // bigint => number conversion
// 	if (!isWithinExpiration(tokenExpires)) {
// 		return false;
// 	}
// 	return true;
// };
