import { useQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import { getAuthorsQuery, addBookMutation } from "../queries/queries";

function AddBook() {
	const { loading, error, data } = useQuery(getAuthorsQuery);
	const [addBook, { data: bookData, loading: bookLoading, error: bookError }] = useMutation(addBookMutation, {
		refetchQueries: [
			{ query: getAuthorsQuery }, // DocumentNode object parsed with gql
			'getAuthorsQuery' // Query name
		]
	});

	const [name, setName] = useState("");
	const [genre, setGenre] = useState("");
	const [authorId, setAuthorId] = useState("");

	const submitForm = (e) => {
		e.preventDefault();
		addBook({
			variables: {
				name: name,
				genre: genre,
				authorId: authorId
			}
		});
	};

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error : {error.message}</p>;

	if (bookLoading) return <p>Adding...</p>;
	if (bookError) return <p>Error : {bookError.message}</p>;

	return (
		<form id="add-book" onSubmit={submitForm}>
			<div className="field">
				<label>Book name:</label>
				<input type="text" onChange={(e) => setName(e.target.value)} />
			</div>

			<div className="field">
				<label>Genre:</label>
				<input type="text" onChange={(e) => setGenre(e.target.value)} />
			</div>

			<div className="field">
				<label>Author:</label>
				<select onChange={(e) => setAuthorId(e.target.value)} >
					<option>Select author</option>
					{
						data.authors.map(({ name, id }) => (
							<option key={id} value={id}>{name}</option>
						))
					}
				</select>
			</div>

			<button>+</button>
		</form>
	);
}

export default AddBook;
