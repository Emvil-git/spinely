import dotenv from 'dotenv';

dotenv.config();

const SQLITE_HOST = process.env.SQLITE_HOST || "localhost";
const SQLITE_DATABASE = process.env.SQLITE_DATABASE || "./spinely_db.db";
// const SQLITE_USER = process.env.MYSQL_USER || "root";
// const SQLITE_HOST = process.env.MYSQL_PASSWORD || "";

const SQLITE = {
    host: SQLITE_HOST,
    database: SQLITE_DATABASE
}

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 4000;

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT
};

const config_sqlite = {
    sqlite_c: SQLITE,
    server: SERVER
};

export default config_sqlite;
