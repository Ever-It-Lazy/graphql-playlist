const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const dotenv = require('dotenv');

const mongoose = require("mongoose");
mongoose.set('strictQuery', false);

const app = express();
dotenv.config();

mongoose.connect(process.env.MONGO_URI);
mongoose.connection.once("open", () => {
	console.log("connected to database");
});

app.use("/graphql", graphqlHTTP({
	schema,
	graphiql: true
}));

app.listen(4000, () => {
	console.log("now listening for requests on port 4000");
});