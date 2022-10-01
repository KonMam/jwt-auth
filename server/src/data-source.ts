import { DataSource } from "typeorm";

export const appDataSource = new DataSource({
    type: "postgres",
    host: process.env.PGHOST,
    port: parseInt(process.env.PGPORT!),
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    entities: ["./src/entities/*.ts"],
    synchronize: true,
    logging: true,
})