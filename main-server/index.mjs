import express from "express";
import https from "https";

const app = express();
const port = 4000;

var options = {
  host: "localhost",
  path: "/api/load",
};

var req = https.get(options, function (res) {
  console.log("STATUS: " + res.statusCode);
  console.log("HEADERS: " + JSON.stringify(res.headers));

  // Buffer the body entirely for processing as a whole.
  var bodyChunks = [];
  res
    .on("data", function (chunk) {
      // You can process streamed parts here...
      bodyChunks.push(chunk);
    })
    .on("end", function () {
      var body = Buffer.concat(bodyChunks);
      console.log("BODY: " + body);
      // ...and/or process the entire body here.
    });
});

req.on("error", function (e) {
  console.log("ERROR: " + e.message);
});

var { graphqlHTTP } = require("express-graphql");
var { buildSchema } = require("graphql");

var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

var root = { hello: () => "Hello world!" };

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);
app.listen(port, () => console.log("Now browse to localhost:4000/graphql"));
