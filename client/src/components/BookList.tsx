import React from "react";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import { getBooksQuery } from "../queries/queries";
import BookDetails from "./BookDetails";

function BookList() {
	const { loading, error, data } = useQuery(getBooksQuery);
	const [bookId, setBookId] = useState<string|null>(null);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error : {error.message}</p>;

	return (
		<div>
			<ul id="book-list">
				{
					data.books.map((book: { name: string, id: string }) => (
						<li key={book.id} onClick={() => setBookId(book.id)}>{book.name}</li>
					))
				}
			</ul>
			<BookDetails bookId={bookId} />
		</div>
	);
}

export default BookList;
