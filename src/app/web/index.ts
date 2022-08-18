import express, { Application } from "express";
import router from "./routes/Router";
import session from "express-session";
import store from "connect-mongo";
import passport from "passport";
import cors from "cors";
import { ConfigDashboard, ConfigDatabase } from "../core/interfaces";
import { Config } from "../core/handler";

require("./strategies/discord");

class Dashboard {
    private config_dashboard: ConfigDashboard = Config.getDashboardConfig();
    private config_database: ConfigDatabase = Config.getDatabaseConfig();
    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = this.config_dashboard.dashboard_port;
        this.crteateApp();
    }

    private async crteateApp() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

        this.app.use(
            cors({
                origin: [`http://localhost:${this.port}`],
                credentials: true,
            })
        );

        this.app.use(
            session({
                secret: this.config_dashboard.dashboard_secret,
                resave: false,
                saveUninitialized: false,
                cookie: {
                    maxAge: 60000 * 60 * 24 * 7,
                },
                store: store.create({
                    mongoUrl: `mongodb://${this.config_database.mongodb_host}:${this.config_database.mongodb_port}/${this.config_database.mongodb_name}`,
                }),
            })
        );

        this.app.use(passport.initialize());
        this.app.use(passport.session());

        this.app.use("/", router);
    }

    public async init() {
        try {
            this.app.listen(this.port, () => {
                console.log(`Dashboard initialized on port ${this.port}`);
            });
        } catch (err) {
            console.error(err as string);
        }
    }
}

export default Dashboard;
