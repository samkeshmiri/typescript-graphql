import { createConnection, getConnection } from "typeorm"
import { User } from "../entity/User";

export const connection = {
    create: (drop = false) => {
        return createConnection({
            name: "default",
            type: "postgres",
            host: "localhost",
            port: 5432,
            username: "postgres",
            password: "postgres",
            database: "typegraphql",
            synchronize: drop,
            dropSchema: drop,
            entities: [User]
        })
    },
    close: () => {
        return getConnection().close();
    }
}