export interface ConfigDatabase {
    mongodb_host: string;
    mongodb_port: string;
    mongodb_name: string;
}

export interface ConfigDashboard {
    dashboard_port: string;
    dashboard_secret: string;
}

export interface ConfigDiscord {
    discord_token: string;
    discord_client: string;
    discord_guild: string;
    discord_secret: string;
    discord_callback: string;
}
