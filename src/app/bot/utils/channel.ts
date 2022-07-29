import { Client, TextChannel } from "discord.js";

export default function getTextChannel(
    client: Client,
    guildID: string,
    channelID: string
): TextChannel {
    return client.guilds.cache
        .get(guildID)
        ?.channels.cache.get(channelID) as TextChannel;
}
