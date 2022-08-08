import { ConfigHandler } from "./core/handler";
import { Intents } from "discord.js";
import DiscordClient from "./bot/client";
import { Localization } from "./core/interfaces";
import localization from "../../config/localization.json";
import Database from "./core/database";

export const language: Localization = localization;
export const config = new ConfigHandler();

new Database().init();

new DiscordClient({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_VOICE_STATES,
    ],
}).init();
