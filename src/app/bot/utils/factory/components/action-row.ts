import {
    MessageActionRow,
    MessageActionRowComponentResolvable,
} from "discord.js";

export class RowFactory {
    public create(
        components: MessageActionRowComponentResolvable[]
    ): MessageActionRow {
        const row = new MessageActionRow();

        row.addComponents(components);

        return row;
    }
}
