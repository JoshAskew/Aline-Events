"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']; // Get token from the Authorization header
    if (!token) {
        res.sendStatus(401); // Unauthorized if token is not present
        return; // Ensure to exit the function here
    }
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            res.sendStatus(403); // Forbidden if token is invalid
            return; // Ensure to exit the function here
        }
        req.user = user; // Attach the user payload to the request object
        next(); // Call the next middleware or route handler
    });
};
exports.authenticateToken = authenticateToken;
