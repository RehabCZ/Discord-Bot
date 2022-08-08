import { ConfigDatabase } from "../interfaces";
import mongoose, { ConnectOptions } from "mongoose";
import { config } from "../../main";

class Database {
    private _config: ConfigDatabase = config.getDatabaseConfig();
    private _mongoHost: string = this._config.mongodb_host;
    private _mongoPort: string = this._config.mongodb_port;
    private _mongoName: string = this._config.mongodb_name;

    private _options: ConnectOptions = {
        serverSelectionTimeoutMS: 5000,
        maxPoolSize: 10,
        autoIndex: false,
        socketTimeoutMS: 4500,
        family: 4,
    };

    public async init() {
        mongoose
            .connect(
                `mongodb://${this._mongoHost}:${this._mongoPort}/${this._mongoName}`,
                this._options
            )
            .then(() => console.log("Connected to MongoDB"))
            .catch((err) => console.error(err as string));
    }
}

export default Database;
