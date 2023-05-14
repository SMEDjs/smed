import dotenv from 'dotenv';
dotenv.config();
import { error } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import type { RequestHandler } from './$types';
import Jimp from 'jimp';

export const GET = (async ({ params }) => {
	try {
		const id = params.imageId;
		if (!id) throw error(404, 'Invalid image ID');
		const image = await prisma.image.findUnique({
			where: {
				id
			}
		});
		const img = await Jimp.read(image.url);
		const icon = await Jimp.read(process.env.ICON_URL ?? "");

		const iconSize = Math.min(img.getWidth(), img.getHeight()) * 0.4;
		icon.contain(iconSize, iconSize);
		img.composite(icon, 0, img.getHeight() - icon.getHeight()) 

		const imageBuffer = await img.getBufferAsync(Jimp.MIME_PNG);
		const headers = new Headers({
			'Content-Type': 'image/png',
			'Content-Length': imageBuffer.length.toString()
		});

		const response = new Response(imageBuffer, { headers });
		return Promise.resolve(response);
	} catch (err) {
		console.log(err);
		throw error(400, 'Something wrong happend');
	}
}) satisfies RequestHandler;
