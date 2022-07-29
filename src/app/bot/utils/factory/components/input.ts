import { TextInputComponent, TextInputStyleResolvable } from "discord.js";

export class InputFactory {
    public create(
        id: string,
        label: string,
        style: TextInputStyleResolvable,
        placeholder?: string,
        required?: boolean,
        min_length?: number,
        max_length?: number,
        initial_value?: string
    ): TextInputComponent {
        const input = new TextInputComponent();

        // Required input properties
        input.setCustomId(id);
        input.setLabel(label);
        input.setStyle(style);

        // Optional button properties
        if (typeof placeholder !== "undefined")
            input.setPlaceholder(placeholder);
        if (typeof required !== "undefined") input.setRequired(required);
        if (typeof min_length !== "undefined") input.setMinLength(min_length);
        if (typeof max_length !== "undefined") input.setMaxLength(max_length);
        if (typeof initial_value !== "undefined") input.setValue(initial_value);

        return input;
    }
}
