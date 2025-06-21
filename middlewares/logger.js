export function logger(req, res, next) {
    const datetime = new Date().toISOString();
    console.log(`[${datetime}] -  ${req.method} ${req.originalurl}`);
    next();
}

export default logger;