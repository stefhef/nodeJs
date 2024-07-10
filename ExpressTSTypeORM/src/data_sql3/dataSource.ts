import { DataSource } from "typeorm";
import * as path from "path";
import { User } from "./models/User";


const databasePath = path.join(__dirname, "..", "database.db");


export const AppDataSource = new DataSource({
    type: "sqlite",
    database: databasePath,
    synchronize: true,
    entities: [User]
});

export const initDataSource = async () => {
    await AppDataSource.initialize();
    console.log("Database connected and init");
};

initDataSource().catch((error) => console.log("Database error", error))
