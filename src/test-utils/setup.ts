import { connection } from "./testConn";

connection.create(true).then(() => process.exit());
