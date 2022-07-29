import { Event } from "@app-bot/interfaces";
import { ApplicationCommandDataResolvable } from "discord.js";

export const event: Event = {
    name: "ready",
    run: async (client) => {
        // Register commands to guild
        const guild = client.guilds.cache.get(client.getConfig().discord_guild);

        await guild?.commands.set(
            client.getCommands().toJSON() as ApplicationCommandDataResolvable[]
        );
    },
};
