import dotenv from 'dotenv';
dotenv.config();
import { error } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import type { RequestHandler } from './$types';
import Jimp from 'jimp';
import gifwrap from "gifwrap"

export const GET = (async ({ params }) => {
	try {
		const id = params.imageId;
		if (!id) throw error(404, 'Invalid image ID');
		const image = await prisma.image.findUnique({
			where: {
				id
			}
		});
		const response = await fetch(image.url);
		if(response.status === 404) throw error(404) 

		let buffer = await response.arrayBuffer();
		const img = await Jimp.read(image.url);
		if(img.getMIME() !== Jimp.MIME_GIF) {
			const icon = await Jimp.read(process.env.ICON_URL ?? "");
			const iconSize = Math.min(img.getWidth(), img.getHeight()) * 0.4;
			icon.contain(iconSize, iconSize);
			img.composite(icon, 0, img.getHeight() - icon.getHeight()) 
			buffer = await img.getBufferAsync(img.getMIME());
		}

		const headers = new Headers({
			'Content-Type': img.getMIME(),
			'Content-Length': buffer.byteLength.toString()
		});
		const result = new Response(buffer, { headers });
		return Promise.resolve(result);
	} catch (err) {
		console.log(err);
		throw error(400, 'Something wrong happend');
	}
}) satisfies RequestHandler;
