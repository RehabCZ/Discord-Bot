import axios from "axios";
import { DISCORD_API_URL } from "../../core/constants";
import User from "../../core/database/schemas";
import PartialGuild from "../../core/types";
import { Config } from "../../core/handler";

export function getBotGuildsService() {
    return axios.get<PartialGuild[]>(`${DISCORD_API_URL}/users/@me/guilds`, {
        headers: {
            Authorization: `Bot ${Config.getDiscordConfig().discord_token}`,
        },
    });
}

export async function getUserGuildsService(id: string) {
    const user = await User.findById(id);

    if (!user) throw new Error("No user found!");

    return axios.get<PartialGuild[]>(`${DISCORD_API_URL}/users/@me/guilds`, {
        headers: { Authorization: `Bearer ${user.accessToken}` },
    });
}

export async function getMutualGuildsService(id: string) {
    const { data: botGuilds } = await getBotGuildsService();
    const { data: userGuilds } = await getUserGuildsService(id);

    const adminUserGuilds = userGuilds.filter(
        ({ permissions }) => (parseInt(permissions) & 0x8) === 0x8
    );

    return adminUserGuilds.filter((guild) =>
        botGuilds.some((botGuild) => botGuild.id === guild.id)
    );
}
