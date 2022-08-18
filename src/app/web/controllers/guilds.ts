import { getMutualGuildsService } from "../services/guilds";
import { Request, Response } from "express";
import { User } from "../../core/interfaces";

export async function getGuildsController(req: Request, res: Response) {
    const user = req.user as User;
    try {
        const guilds = await getMutualGuildsService(user.id);
        res.send({ guilds });
    } catch (err) {
        console.error(err as string);
        res.status(400).send("Error");
    }
}
