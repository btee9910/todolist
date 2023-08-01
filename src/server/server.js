import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

mongoose.Promise = global.Promise;
mongoose.connect(process.env.CONNECTION_URL);

const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // express to support json

// routes(app); // attach our routes to the servers 
app.listen(PORT);

// a 404 "page not found" 
app.use((req, res) => {  // default function if not function work
    res.status(404).send({ url: `${req.originalUrl} not found` });
});

// avoid access to any other route
app.use("*", (req, res) => {
    res.status(404).json({
        success: "false",
        message: "Page not found",
        error: {
            statusCode: 404,
            message: "You reached a route that is not defined on this server",
        },
    });
});

console.log(`Server running on http://localhost:${PORT})`);