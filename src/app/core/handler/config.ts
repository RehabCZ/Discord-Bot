import config from "../../../../config/config.json";
import { ConfigDashboard, ConfigDatabase, ConfigDiscord } from "../interfaces";

export class Config {
    private static _databaseConfig: ConfigDatabase = config.database;
    private static _dashboardConfig: ConfigDashboard = config.dashboard;
    private static _discordConfig: ConfigDiscord = config.discord;

    public static getDatabaseConfig(): ConfigDatabase {
        return this._databaseConfig;
    }

    public static getDashboardConfig(): ConfigDashboard {
        return this._dashboardConfig;
    }

    public static getDiscordConfig(): ConfigDiscord {
        return this._discordConfig;
    }
}
