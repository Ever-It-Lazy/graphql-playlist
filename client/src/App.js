import BookList from "./components/BookList";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
	uri: "/graphql",
	cache: new InMemoryCache()
});

function App() {
	return (
		<ApolloProvider client={client}>
			<div id="main">
				<h1>Ninja's Reading List</h1>
				<BookList />
			</div>
		</ApolloProvider>
	);
}

export default App;
