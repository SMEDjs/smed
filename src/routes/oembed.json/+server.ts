import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET = (async () => {
	return json({
		type: 'photo'
	});
}) satisfies RequestHandler;
