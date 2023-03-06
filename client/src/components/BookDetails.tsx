import React from "react";
import { useQuery } from "@apollo/client";
import { getBookQuery } from "../queries/queries";

function BookDetails(bookId: any) {
	const id = bookId;
	const { loading, error, data } = useQuery(getBookQuery, {
		variables: { id }
	});

	if (loading) return <p>Loading...</p>;
	if (error) return <p id="book-details">No book has been selected yet.</p>;

	return (
		<div id="book-details">
			<p>Output book details here</p>

			{bookId ? (
				<div>
					<h2>{data.book.name}</h2>
					<p>{data.book.genre}</p>
					<p>All books by {data.book.author.name}:</p>
					<ul className="other-books">
						{/* {data.book.author.books.map((id: string, name: string) => (
							<li key={id}>{name}</li>
						))} */}
					</ul>
				</div>
			) : (
				<div>No book selected...</div>
			)}
		</div>
	);
}

export default BookDetails;
