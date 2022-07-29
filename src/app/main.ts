import ConfigHandler from "@app-core/handler/config-handler";
import { Intents } from "discord.js";
import DiscordClient from "@app-bot/client";
import { Localization } from "@app-core/interfaces/localization";
import localization from "@app-config/localization.json";
import Database from "@app-core/database";

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
