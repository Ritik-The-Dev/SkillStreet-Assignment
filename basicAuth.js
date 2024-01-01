const auth = require('basic-auth');

const basicAuth = async (req, res, next) => {
    console.log("Middleware: Basic Auth ");

    const user = await auth(req);
    console.log(user)
    const userName = 'test'
    const password = '123456'

    if (!user || !user.name || !user.pass) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    if (user.name.toLowerCase() === userName && user.pass.toLowerCase() === password) {
        next();
    } else {
        return res.status(401).json({ message: "Unauthorized" });
    }
};

module.exports = basicAuth;
