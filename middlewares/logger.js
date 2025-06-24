export function logger(req, res, next) {
    const datetime = new Date().toISOString();
    console.log(`[${datetime}] -  ${req.method} ${req.originalUrl}`);
    next();
}

export default logger;

//explian logger. 
//logs wat coming in. time stamp when requests made