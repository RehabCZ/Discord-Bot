import DiscordClient from "@app-bot/client";
import { ApplicationCommandOption, CommandInteraction } from "discord.js";

interface Run {
    (client: DiscordClient, interaction: CommandInteraction);
}

export interface Command {
    name: string;
    description: string;
    type?: number;
    options?: ApplicationCommandOption[];
    run: Run;
}
