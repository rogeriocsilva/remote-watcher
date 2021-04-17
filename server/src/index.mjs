import express from "express";

import apollo from "apollo-server-express";
import schema from "./data/schema.js";
import resolvers from "./data/resolvers.js";
import { startKeyStore, addToKeyStore } from "./utils.mjs";
import joseRouter from "./router.mjs";

const { ApolloServer } = apollo;

const app = express();
const server = new ApolloServer({ schema, resolvers, path: "/graphql" });
server.applyMiddleware({ app });

// Constants
const HOST = process.env.HOST || "0.0.0.0"
const PORT = process.env.PORT || 4000;

startKeyStore(app);

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", joseRouter);

app.post("/device/", addToKeyStore);

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
