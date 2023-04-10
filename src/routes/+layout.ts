import { loadTranslations, locale } from '$lib/translations/translations';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ url }) => {
	const { pathname } = url;
	const initLocale = locale.get() || 'en';
	await loadTranslations(initLocale, pathname);

	return {};
};
