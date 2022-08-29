import DiscordClient from "../client";

interface Run {
    (client: DiscordClient, ...args: any[]);
}

export interface Interval {
    name: string;
    delay: number;
    run: Run;
}
