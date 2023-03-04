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
	console.log("connected TO database");
});

app.use("/graphql", graphqlHTTP({
	schema,
	graphiql: true
}));


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
	console.log(`now listening FOR requests on port ${PORT}`);
});