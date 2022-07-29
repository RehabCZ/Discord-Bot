import { Command } from "@app-bot/interfaces";
import { GuildMember } from "discord.js";

export const command: Command = {
    name: "testjoin",
    description: "Fire guildMemberAdd event",
    run: async (client, interaction) => {
        interaction.reply({ content: "Join event executed", ephemeral: true });
        client.emit("guildMemberAdd", interaction.member as GuildMember);
    },
};
