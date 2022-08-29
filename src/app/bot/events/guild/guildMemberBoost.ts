import { GuildMember } from "discord.js";
import { Event } from "../../interfaces";

export const event: Event = {
    name: "guildMemberUpdate",
    run: async (client, oldMember: GuildMember, newMember: GuildMember) => {
        const oldStatus = oldMember.premiumSince;
        const newStatus = newMember.premiumSince;

        const guildBoosts = newMember.guild.premiumSubscriptionCount;

        // Member boosted
        if (!oldStatus && newStatus) {
            console.log(`${newMember.user} boosted guild`);
        }

        // Member unboosted
        if (oldStatus && !newStatus) {
            console.log(`${newMember.user} unboosted guild`);
        }
    },
};
