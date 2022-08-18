import { Router } from "express";
import { isAuthenticated } from "../../middlewares/auth";
import { getGuildsController } from "../../controllers/guilds";

const router = Router();

router.get("/", isAuthenticated, getGuildsController);

export default router;
