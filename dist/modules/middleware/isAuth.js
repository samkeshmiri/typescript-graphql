export const isAuth = async ({ context }, next) => {
    if (!context.req.session.userId) {
        throw new Error("not authenticated");
    }
    return next();
};
//# sourceMappingURL=isAuth.js.map