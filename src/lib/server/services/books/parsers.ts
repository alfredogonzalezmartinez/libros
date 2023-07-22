import { BOOK_FIELD, BOOK_FIELD_OPENLIBRA_MATCH } from './constants';

export function parseOpenLibraBooks(
	openLibraBook: OpenLibraBook[],
	fieldsFilter?: BookField[]
): (Book | Partial<Book>)[] {
	return openLibraBook.map((book) => parseOpenLibraBook(book, fieldsFilter));
}

export function parseOpenLibraBook(
	openLibraBook: OpenLibraBook,
	fieldsFilter?: BookField[]
): Book | Partial<Book> {
	if (fieldsFilter != null) return getPartialBook(openLibraBook, fieldsFilter);

	return {
		id: Number(openLibraBook.ID),
		title: openLibraBook.title,
		author: openLibraBook.author,
		content: openLibraBook.content,
		language: openLibraBook.language,
		pages: Number(openLibraBook.pages),
		publisher: openLibraBook.publisher,
		publisherDate: openLibraBook.publisher_date,
		cover: openLibraBook.cover,
		openLibraUrl: openLibraBook.url_download,
		categories: openLibraBook.categories.map(parseOpenLibraCategory)
	};
}

function getPartialBook(openLibraBook: OpenLibraBook, fieldsFilter: BookField[]): Partial<Book> {
	const partialBook: Partial<Book> = {};

	fieldsFilter.forEach((field) => {
		const OpenLibraBookField = BOOK_FIELD_OPENLIBRA_MATCH[field];
		if (field === BOOK_FIELD.ID || field === BOOK_FIELD.PAGES)
			return (partialBook[field] = Number(openLibraBook[OpenLibraBookField]));

		if (field === BOOK_FIELD.CATEGORIES)
			return (partialBook[field] = openLibraBook.categories.map(parseOpenLibraCategory));

		return (partialBook[field] = openLibraBook[OpenLibraBookField] as string);
	});

	return partialBook;
}

export function parseOpenLibraCategory(category: OpenLibraCategory): Category {
	return { id: category.category_id, name: category.name };
}

export function parseOpenLibraSubcategory(category: OpenLibraSubcategory): Category {
	return { id: category.subcategory_id, name: category.name };
}

export function parseBooksFilter(filter: BooksFilter): OpenLibraBooksFilters {
	return {
		book_title: filter.title,
		category: filter.category,
		lang: filter.language,
		num_items: filter.limit,
		order: filter.order,
		subcategory: filter.subcategory,
		results_range: filter.offset
	};
}
