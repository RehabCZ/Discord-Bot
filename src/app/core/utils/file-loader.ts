import { readdirSync } from "fs";

export default async function* getFiles(dir: string) {
    const entries = await readdirSync(dir, { withFileTypes: true });

    for (let file of entries) {
        if (file.isDirectory()) {
            yield* getFiles(`${dir}${file.name}\\`);
        }

        if (file.name.endsWith(".ts") || file.name.endsWith(".js")) {
            yield { ...file, path: dir + file.name };
        }
        continue;
    }
}
