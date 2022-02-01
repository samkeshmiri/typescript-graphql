import { v4 } from "uuid";
import { confirmUserPrefix } from "../modules/constants/redisprefixes";
import { redis } from "../redis";
export const createConfirmationUrl = async (userId) => {
    const token = v4();
    await redis.set(confirmUserPrefix + token, userId, "ex", 60 * 60 * 24);
    return `http://localhost:3000/user/confirm/${token}`;
};
//# sourceMappingURL=createConfirmationUrl.js.map