import { MessageSelectMenu, MessageSelectOptionData } from "discord.js";

export class SelectFactory {
    public create(
        id: string,
        placeholder: string,
        options: MessageSelectOptionData[],
        disabled?: boolean
    ): MessageSelectMenu {
        const select = new MessageSelectMenu();

        // Required selection properties
        select.setCustomId(id);
        select.setPlaceholder(placeholder);

        options.forEach((option) => {
            select.addOptions(option);
        });

        // Optional selection properties
        if (typeof disabled !== "undefined") select.setDisabled(disabled);

        return select;
    }
}
