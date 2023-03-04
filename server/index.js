const express = require("express");
const path = require("path");
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

// --------------- deployment ---------------

__dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/client/build")));

	app.get("*", (req,res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
} else {
	app.get('/', (req,res) => {
		res.send("API is running..");
	});
}

// --------------- deployment ---------------

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
	console.log(`now listening FOR requests on port ${PORT}`);
});