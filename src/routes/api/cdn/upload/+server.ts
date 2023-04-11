import dotenv from 'dotenv';
dotenv.config();
import { error, json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import type { RequestHandler } from './$types';
import { WebhookClient } from 'discord.js';

export const POST = (async ({ request }) => {
	try {
		const data = await request.formData();
		const image = data.get('image') as File;
		const description = data.get('description') ? data.get('description') : image.name;
		if (!image || !description) throw error(500, 'No image passed');
		if (description.length > 100) throw error(500, 'Description too long');
		const webhookClient = new WebhookClient({
			id: '1095042485887176785',
			token: process.env.TOKEN ?? ''
		});

		const bufferArray = await image.arrayBuffer();
		const webhook = await webhookClient.send({
			content: image.name,
			username: 'uploader',
			files: [
				{
					attachment: Buffer.from(bufferArray),
					name: image.name
				}
			]
		});
		const { id, url, width, height, size } = webhook.attachments[0];
		const createdImg = await prisma.image.create({
			data: {
				discordId: id,
				url,
				width,
				size,
				height,
				description,
				fileName: image.name
			}
		});
		const imgUrl = `https://smed.wtf/api/cdn/${createdImg.id}`;
		return json({
			error: false,
			message: `Uploaded successfully, you can view your image at https://${createdImg.id}.smed.wtf/`,
			id,
			pageUrl: `https://${createdImg.id}.smed.wtf/`,
			url: imgUrl,
			width,
			height,
			size
		});
	} catch (err) {
		console.log(err);
		throw error(400, 'Something wrong happend');
	}
}) satisfies RequestHandler;
