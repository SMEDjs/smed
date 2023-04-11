import { json } from '@sveltejs/kit';
import Jimp from 'jimp';

export const GET = async ({ url }) => {
	const gato =
		'https://media.discordapp.net/attachments/949825336961564672/974389940114837554/C9A9BDC2-7696-4EAE-A3A2-5C7F408D61E1.jpg';
	try {
		const x = url.searchParams.get('x') ?? 500;
		const y = url.searchParams.get('y') ?? 500;
		const deg = url.searchParams.get('deg') ?? 0;
		const img = await Jimp.read(gato);
		img.resize(~~x, ~~y).rotate(~~deg);

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
