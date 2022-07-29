import { MessageActionRow, Modal } from "discord.js";

export class ModalFactory {
    public create(
        id: string,
        title: string,
        components: MessageActionRow<any>[]
    ): Modal {
        const modal: Modal = new Modal();

        // Required properties
        modal.setCustomId(id);
        modal.setTitle(title);

        components.forEach((component) => {
            modal.addComponents(component);
        });

        return modal;
    }
}
