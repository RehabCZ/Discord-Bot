import { Client, Collection } from "discord.js";
import { language } from "../../main";
import { Command, Event } from "../interfaces";
import { ConfigDiscord } from "../../core/interfaces";
import {
    ButtonFactory,
    EmbedFactory,
    InputFactory,
    ModalFactory,
    RowFactory,
    SelectFactory,
} from "../utils/factory";
import getFiles from "../../core/utils/file-loader";
import path from "path";
import { Localization } from "../../core/interfaces";
import { Config } from "../../core/handler";

class DiscordClient extends Client {
    private _commands: Collection<string, Command> = new Collection();
    private _events: Collection<string, Event> = new Collection();
    private _config: ConfigDiscord = Config.getDiscordConfig();
    private _language: Localization = language;

    // Components factories
    public embedFactory: EmbedFactory = new EmbedFactory();
    public modalFactory: ModalFactory = new ModalFactory();
    public buttonFactory: ButtonFactory = new ButtonFactory();
    public selectFactory: SelectFactory = new SelectFactory();
    public inputFactory: InputFactory = new InputFactory();
    public actionRowFactory: RowFactory = new RowFactory();

    // Initial discord bot
    public async init(): Promise<void> {
        try {
            await this.login(this._config.discord_token);
            await this._loadCommands();
            await this._loadEvents();

            console.log(language.bot_ready_event_message);
        } catch (err) {
            console.error(err);
        }
    }

    private async _loadCommands(): Promise<void> {
        const commandPath = path.join(__dirname, "..", "commands\\");

        for await (const file of getFiles(commandPath)) {
            const { command } = await import(file.path);

            try {
                this._commands.set(command.name, command);
                // Register commands via ready event
                console.log(`loaded command: ${command.name}`);
            } catch (err) {
                console.error(err);
            }
        }
    }

    private async _loadEvents(): Promise<void> {
        const eventPath = path.join(__dirname, "..", "events\\");

        for await (const file of getFiles(eventPath)) {
            const { event } = await import(file.path);

            try {
                this._events.set(event.name, event);
                this.on(event.name, event.run.bind(null, this));
                console.log(
                    `loaded event: ${file.name.replace(".ts" ?? ".js", "")}`
                );
            } catch (err) {
                console.error(err);
            }
        }
    }

    // Commands getter
    public getCommands(): Collection<string, Command> {
        return this._commands;
    }

    // Config getter
    public getConfig(): ConfigDiscord {
        return this._config;
    }

    // Language getter
    public getLanguage(): Localization {
        return this._language;
    }
}

export default DiscordClient;
