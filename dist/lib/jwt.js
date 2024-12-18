"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const env_1 = require("./env");
const jsonwebtoken_1 = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        res.status(401).send({
            message: "Authentication failed. Token is missing",
        });
        return;
    }
    (0, jsonwebtoken_1.verify)(token, env_1.JWT_SECRET_KEY, (err, payload) => {
        if (err) {
            if (err instanceof jsonwebtoken_1.TokenExpiredError) {
                res.status(401).send({ message: "Token expired" });
            }
            else {
                res.status(401).send({ message: "Invalid Token" });
            }
        }
        res.locals.user = payload;
        next();
    });
};
exports.verifyToken = verifyToken;
