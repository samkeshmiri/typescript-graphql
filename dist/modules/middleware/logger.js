export const logger = async ({}, next) => {
    console.log("I am middleware");
    return next();
};
//# sourceMappingURL=logger.js.map