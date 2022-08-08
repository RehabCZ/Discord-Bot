import { Event } from "../../interfaces";
import getTextChannel from "../../utils/channel";
import { GuildMember } from "discord.js";

export const event: Event = {
    name: "guildMemberRemove",
    run: async (client, member: GuildMember) => {
        const channel = getTextChannel(
            client,
            client.getConfig().discord_guild,
            "949370778439266355"
        );

        const embed = client.embedFactory.create(
            "RED",
            "",
            client
                .getLanguage()
                .member_leave_guild.replace("%member%", `<@${member.id}>`)
        );

        console.log(`User ${member.user.tag} left the guild`);

        channel.send({ embeds: [embed] });
    },
};
