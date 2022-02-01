import { createConnection } from "typeorm"

export const testConn = 
    (drop: boolean = false) => {
    return createConnection({
        name: "default",
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "sam",
        password: "test",
        database: "typegraphql-example-test",
        synchronize: drop,
        logging: drop, // no pgsql commands in console
        dropSchema: true,
        entities: [__dirname + "/../entity/*.*" ] 
    });
}