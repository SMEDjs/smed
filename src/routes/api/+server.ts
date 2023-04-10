import { json } from '@sveltejs/kit';
import fs from "fs"
import path from 'path';
import type { RequestHandler } from './$types';
 
export const GET = (async ({url}) => {

    async function getFilesRecursively(dir: string, files: string[]): Promise<string[]> {
        const filesInDir = fs.readdirSync(dir);
        for (const file of filesInDir) {
            const fullPath = path.join(dir, file);
            if (fs.statSync(fullPath).isDirectory()) {
                const hasServerFile = fs.existsSync(path.join(fullPath, '+server.ts'));
                if (hasServerFile) {
                    const path = fullPath.replace('src\\routes\\', '').replaceAll('\\', '/');
                    const test = await import("../src/routes/" + path + "/+server.ts")
                    files.push(`${test._info?.type} - ${path} - ${test._info?.description ?? "Unknown"}`);
                }
                await getFilesRecursively(fullPath, files);
            }
        }
        return files;
    }
    const files = await getFilesRecursively('./src/routes/api', []);
    return json({description: "Here are the different API routes", routes: files});
}) satisfies RequestHandler;