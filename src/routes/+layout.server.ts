import { loadTranslations, locale } from '$lib/translations/translations';
import { error } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
import { prisma } from '$lib/server/prisma';

export const load: LayoutLoad = async ({ url }) => {
	const subdomain = url.hostname.split('.')?.[0];
	console.log(subdomain);
	const { pathname } = url;
	const initLocale = locale.get() || 'en';
	await loadTranslations(initLocale, pathname);
	if (!subdomain) return {};
	try {
		const id = Number(subdomain);
		if (isNaN(id)) return {};
		const image = await prisma.image.findUnique({
			where: {
				id
			}
		});
		console.log(image);
		if (!image) return {};
		return image;
	} catch (err) {
		console.log(err);
		throw error(500, 'Something wrong happend!');
	}
};
