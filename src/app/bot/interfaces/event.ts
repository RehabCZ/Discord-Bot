import DiscordClient from "src/app/bot/client";
import { ClientEvents } from "discord.js";

interface Run {
    (client: DiscordClient, ...args: any[]);
}

export interface Event {
    name: keyof ClientEvents;
    run: Run;
}
