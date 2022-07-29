import {
    ColorResolvable,
    EmbedAuthorData,
    EmbedFieldData,
    EmbedFooterData,
    MessageEmbed,
} from "discord.js";

export class EmbedFactory {
    public create(
        color: ColorResolvable,
        title: string,
        description: string,
        author?: EmbedAuthorData,
        image?: string,
        thumbnail?: string,
        timestamp?: Date,
        fields?: EmbedFieldData[],
        footer?: EmbedFooterData
    ): MessageEmbed {
        const embed: MessageEmbed = new MessageEmbed();

        // Required properties
        embed.setColor(color);
        embed.setTitle(title);
        embed.setDescription(description);

        // Optional properties
        if (typeof author !== "undefined") embed.setAuthor(author);
        if (typeof image !== "undefined") embed.setImage(image);
        if (typeof thumbnail !== "undefined") embed.setThumbnail(thumbnail);
        if (typeof timestamp !== "undefined") embed.setTimestamp(timestamp);
        if (typeof fields !== "undefined") embed.addFields(fields);
        if (typeof footer !== "undefined") embed.setFooter(footer);

        return embed;
    }
}
