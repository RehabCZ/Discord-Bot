import DiscordClient from "@app-bot/client";
import { Event } from "@app-bot/interfaces";
import { language } from "app/main";
import { CommandInteraction, PermissionResolvable } from "discord.js";

export const event: Event = {
    name: "interactionCreate",
    run: async (
        client: DiscordClient,
        interaction: CommandInteraction,
        args: string[]
    ) => {
        try {
            if (!interaction.isCommand()) return;

            const command = client.getCommands().get(interaction.commandName);

            if (!command) return;

            const permissions = interaction.command?.permissions;

            if (
                interaction.memberPermissions?.has(
                    permissions as keyof PermissionResolvable
                )
            )
                await command.run(client, interaction);
            else
                interaction.reply({
                    embeds: [
                        client.embedFactory.create(
                            "RED",
                            "",
                            language.member_no_permission
                        ),
                    ],
                    ephemeral: true,
                });
        } catch (err) {
            console.error(err);
            await interaction.reply({
                embeds: [
                    client.embedFactory.create(
                        "RED",
                        "",
                        "Unexpected error has occured during command dispatch"
                    ),
                ],
                ephemeral: true,
            });
        }
    },
};
