import { Event } from "@app-bot/interfaces";
import getTextChannel from "@app-bot/utils/channel";
import { GuildMember } from "discord.js";

export const event: Event = {
    name: "guildMemberAdd",
    run: async (client, member: GuildMember) => {
        const channel = getTextChannel(
            client,
            client.getConfig().discord_guild,
            "949370748982681670"
        );

        const embed = client.embedFactory.create(
            "GREEN",
            "",
            client
                .getLanguage()
                .member_join_guild.replace("%member%", `<@${member.id}>`)
        );

        console.log(`User ${member.user.tag} joined the guild`);

        channel.send({ embeds: [embed] });
    },
};
