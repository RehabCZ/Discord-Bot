import { Command } from "../../interfaces";

export const command: Command = {
    name: "clear",
    description: "Clears messages from chat",
    options: [
        {
            name: "count",
            description: "How many messages should we delete",
            type: "INTEGER",
            required: true,
        },
    ],
    run: async (client, interaction) => {
        const amount = interaction.options.getInteger("count") as number;

        const messages = await interaction.channel?.messages.fetch({
            limit: amount,
        });

        const { size } = messages!;

        const embed = client.embedFactory.create(
            "#459F45",
            "",
            client
                .getLanguage()
                .bot_command_clear.replace("%amount%", size.toString())
        );

        await messages!.forEach((message) => message.delete());

        interaction.reply({ embeds: [embed], ephemeral: true });
    },
};
