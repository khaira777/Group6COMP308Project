import jwt from 'jsonwebtoken';

export const getUserIdFromToken = (req) => {
	const token = req.headers.authorization || '';
	const tokenParts = token.split(' ');
	const userId = jwt.decode(tokenParts[1])?._id;

	return userId;
};
