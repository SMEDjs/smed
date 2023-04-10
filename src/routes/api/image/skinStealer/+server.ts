import { json } from '@sveltejs/kit';
import Jimp from 'jimp';
export const _info: object = {
	type: 'GET',
	description:
		'Steals a minecraft skin by modifying a few pixel from an image url, query parameters: link'
};
export const GET = async ({ url }) => {
	try {
		const link = url.searchParams.get('link');
		if (!link) return json({ error: true, message: 'Missing query link' });
		const img = await Jimp.read(link);
		for (let i = 0; i < 2; i++) {
			for (let j = 0; j < 2; j++) {
				img.setPixelColor(
					Jimp.rgbaToInt(
						~~(Math.random() * 254),
						~~(Math.random() * 254),
						~~(Math.random() * 254),
						255
					),
					i,
					j
				);
			}
		}

		const image = await img.getBufferAsync(Jimp.MIME_PNG);

		const headers = new Headers({
			'Content-Type': 'image/png',
			'Content-Length': image.length.toString()
		});

		const response = new Response(image, { headers });
		return Promise.resolve(response);
	} catch (err) {
		return json({ error: true });
	}
};
