import crypto from "crypto";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";
import Note from "../Models/noteModels.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SEED_NOTES = JSON.parse(
    readFileSync(path.join(__dirname, "..", "seed", "notes.json"), "utf8")
);

const COOKIE_NAME = "demoSession";
const MAX_AGE_SECONDS = 60 * 60 * 24;

const readCookie = (header, name) => {
    if (!header) return null;
    for (const pair of header.split(";")) {
        const [k, v] = pair.trim().split("=");
        if (k === name) return decodeURIComponent(v ?? "");
    }
    return null;
};

export const ensureSession = async (req, res, next) => {
    try {
        let sessionId = readCookie(req.headers.cookie, COOKIE_NAME);

        if (!sessionId) {
            sessionId = crypto.randomUUID();
            await Note.insertMany(SEED_NOTES.map(n => ({ ...n, sessionId })));
            const secureFlag = process.env.NODE_ENV === "production" ? "; Secure" : "";
            res.setHeader(
                "Set-Cookie",
                `${COOKIE_NAME}=${sessionId}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${MAX_AGE_SECONDS}${secureFlag}`
            );
        }

        req.sessionId = sessionId;
        next();
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Failed to initialize session" });
    }
};
