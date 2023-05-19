import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';

export const load: LayoutServerLoad = async ({ url }: { url: URL }) => {
	const subdomain = url.hostname.split('.')?.[0];
	if (!subdomain) return {};
	try {
		if (!subdomain || subdomain === "smed") return {};
		const image = await prisma.image.findUnique({
			where: {
				id: subdomain
			}
		});
		if (!image) return {};
		console.log(image)
		return image;
	} catch (err) {
		console.log(err);
		throw error(500, 'Something wrong happend!');
	}
};
