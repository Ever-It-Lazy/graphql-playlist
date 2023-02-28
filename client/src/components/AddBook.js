import { gql, useQuery } from "@apollo/client";

const getAuthorsQuery = gql`
	{
		authors {
			name
			id
		}
	}
`

function AddBook() {
	const { loading, error, data } = useQuery(getAuthorsQuery);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error : {error.message}</p>;

	return (
		<form id="add-book">
			<div className="field">
				<label>Book name:</label>
				<input type="text" />
			</div>

			<div className="field">
				<label>Genre:</label>
				<input type="text" />
			</div>

			<div className="field">
				<label>Author:</label>
				<select>
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
