import passport from "passport";
import { Profile, Strategy } from "passport-discord";
import { VerifyCallback } from "passport-oauth2";
import User from "../../core/database/schemas";
import { ConfigDiscord } from "../../core/interfaces";
import { Config } from "../../core/handler";

const credentials: ConfigDiscord = Config.getDiscordConfig();

passport.serializeUser((user: any, done) => {
    return done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
    try {
        const user = await User.findById(id);
        return user ? done(null, user) : done(null, null);
    } catch (err) {
        console.error(err as string);
        return done(err, null);
    }
});

passport.use(
    new Strategy(
        {
            clientID: credentials.discord_client,
            clientSecret: credentials.discord_secret,
            callbackURL: credentials.discord_callback,
            scope: ["identify", "email", "guilds"],
        },
        async (
            accessToken: string,
            refreshToken: string,
            profile: Profile,
            done: VerifyCallback
        ) => {
            try {
                const { id: discordId } = profile;
                const existingUser = await User.findOneAndUpdate(
                    { discordId },
                    { accessToken, refreshToken },
                    { new: true }
                );
                if (existingUser) return done(null, existingUser);

                const newUser = new User({
                    discordId,
                    accessToken,
                    refreshToken,
                });
                const saveUser = await newUser.save();

                return done(null, saveUser);
            } catch (err) {
                console.error(err as string);
                return done(err as any, undefined);
            }
        }
    )
);
