import { Command } from "@app-bot/interfaces";
import { GuildMember } from "discord.js";

export const command: Command = {
    name: "ping",
    description: "basic ping cmd",
    run: async (client, interaction) => {
        const embed = client.embedFactory.create(
            "RED",
            "Ping command",
            "PONG BITCH"
        );

        interaction.reply({ embeds: [embed], ephemeral: false });
    },
};
