import config from "../../../../config/config.json";
import { ConfigDashboard, ConfigDatabase, ConfigDiscord } from "../interfaces";

export class ConfigHandler {
    private _databaseConfig: ConfigDatabase;
    private _dashboardConfig: ConfigDashboard;
    private _discordConfig: ConfigDiscord;

    constructor() {
        this._databaseConfig = config.database;
        this._dashboardConfig = config.dashboard;
        this._discordConfig = config.discord;
    }

    public getDatabaseConfig(): ConfigDatabase {
        return this._databaseConfig;
    }

    public getDashboardConfig(): ConfigDashboard {
        return this._dashboardConfig;
    }

    public getDiscordConfig(): ConfigDiscord {
        return this._discordConfig;
    }
}
