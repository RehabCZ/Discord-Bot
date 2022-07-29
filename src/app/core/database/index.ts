import { ConfigDatabase } from "@app-core/interfaces";
import mongoose from "mongoose";
import { config } from "../../main";

class Database {
    private _config: ConfigDatabase = config.getDatabaseConfig();
    private _mongoHost: string = this._config.mongodb_host;
    private _mongoPort: string = this._config.mongodb_port;
    private _mongoName: string = this._config.mongodb_name;

    public async init() {
        mongoose
            .connect(
                `mongodb://${this._mongoHost}:${this._mongoPort}/${this._mongoName}`
            )
            .then(() => console.log("Connected to MongoDB"))
            .catch((err) => console.error(err as string));
    }
}

export default Database;
