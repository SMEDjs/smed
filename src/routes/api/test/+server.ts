import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
export const _info: object = {
	type: 'GET',
	description: 'Return a random number'
};
export const GET = (({ url }) => {
	const min = Number(url.searchParams.get('min') ?? '0');
	const max = Number(url.searchParams.get('max') ?? '1');

	const d = max - min;

	if (isNaN(d) || d < 0) {
		throw error(400, 'min and max must be numbers, and min must be less than max');
	}

	const random = min + Math.random() * d;

	return json({ number: random });
}) satisfies RequestHandler;
