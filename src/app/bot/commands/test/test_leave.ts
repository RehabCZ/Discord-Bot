import { Command } from "../../interfaces";
import { GuildMember } from "discord.js";

export const command: Command = {
    name: "testleave",
    description: "Fire guildMemberRemove event",
    run: async (client, interaction) => {
        interaction.reply({ content: "Leave event executed", ephemeral: true });
        client.emit("guildMemberRemove", interaction.member as GuildMember);
    },
};
