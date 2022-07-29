import { MessageButton, MessageButtonStyle } from "discord.js";

export class ButtonFactory {
    public create(
        id: string,
        label: string,
        style: MessageButtonStyle,
        emoji?: string,
        url?: string,
        disabled?: boolean
    ): MessageButton {
        const button = new MessageButton();

        // Required button properties
        if (typeof url == "undefined") button.setCustomId(id);
        button.setLabel(label);
        button.setStyle(style);

        // Optional button properties
        if (typeof url !== "undefined") button.setURL(url);
        if (typeof emoji !== "undefined") button.setEmoji(emoji);
        if (typeof disabled !== "undefined") button.setDisabled(disabled);

        return button;
    }
}
