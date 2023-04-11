import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';

export const load: LayoutServerLoad = async ({ url }: { url: URL }) => {
	const subdomain = url.hostname.split('.')?.[0];
	if (!subdomain) return {};
	try {
		const id = Number(subdomain);
		if (isNaN(id)) return {};
		const image = await prisma.image.findUnique({
			where: {
				id
			}
		});
		if (!image) return {};
		return image;
	} catch (err) {
		console.log(err);
		throw error(500, 'Something wrong happend!');
	}
};
