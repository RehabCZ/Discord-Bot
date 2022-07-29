import { Command } from "@app-bot/interfaces";
import { GuildMember, PermissionResolvable } from "discord.js";

export const command: Command = {
    name: "ban",
    description: "Ban user from guild",
    options: [
        {
            name: "target",
            description: "Select a target",
            type: "USER",
            required: true,
        },
        {
            name: "reason",
            description: "Why we should kick him",
            type: "STRING",
            required: false,
        },
    ],
    run: async (client, interaction) => {
        const target = interaction.options.getMember("target") as GuildMember;
        const reason = interaction.options.getString("reason") as string;

        // Reason length check
        if (reason && reason?.length > 512) {
            return interaction.reply({
                embeds: [
                    client.embedFactory.create(
                        "RED",
                        "",
                        "Reason cannot exceed more than 512 characters"
                    ),
                ],
                ephemeral: true,
            });
        }

        // Cannot ban yourself
        if (target.id === interaction.member?.user.id) {
            return interaction.reply({
                embeds: [
                    client.embedFactory.create(
                        "RED",
                        "",
                        "You cannot ban yourself dumbass"
                    ),
                ],
                ephemeral: true,
            });
        }

        if (
            target.permissions.has(
                (interaction.command
                    ?.permissions as keyof PermissionResolvable) ||
                    "ADMINISTRATOR"
            )
        ) {
            return interaction.reply({
                embeds: [
                    client.embedFactory.create(
                        "RED",
                        "",
                        "You cannot ban this user"
                    ),
                ],
                ephemeral: true,
            });
        }

        target.ban({ reason: reason, days: 7 });

        return interaction.reply({
            embeds: [
                client.embedFactory.create(
                    "GREEN",
                    "",
                    `<@${target.id}> was banned with reason: ${
                        reason ?? "no reason"
                    }`
                ),
            ],
            ephemeral: true,
        });
    },
};
