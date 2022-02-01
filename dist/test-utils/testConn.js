import { createConnection } from "typeorm";
export const testConn = (drop = false) => {
    return createConnection({
        "name": "default",
        "type": "postgres",
        "host": "localhost",
        "port": 5432,
        "username": "sam",
        "password": "test",
        "database": "typegraphql-example-test",
        "synchronize": drop,
        "logging": drop,
        "dropSchema": true,
        "entities": [__dirname + "/../entity/*.*"]
    });
};
//# sourceMappingURL=testConn.js.map