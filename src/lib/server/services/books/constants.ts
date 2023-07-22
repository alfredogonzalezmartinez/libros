export const DEFAULT_CATEGORY = 'all';

export const ORDER = Object.freeze({
	A_TO_Z: 'a_z',
	Z_TO_A: 'z_a',
	NEWEST: 'newest',
	OLDEST: 'oldest'
});

export const DEFAULT_ORDER = ORDER.NEWEST;

export const DEFAULT_LIMIT = 10;
export const DEFAULT_OFFSET = 0;

export const BOOK_FIELD = Object.freeze({
	ID: 'id',
	TITLE: 'title',
	AUTHOR: 'author',
	CONTENT: 'content',
	PUBLISHER: 'publisher',
	PUBLISHER_DATE: 'publisherDate',
	PAGES: 'pages',
	LANGUAGE: 'language',
	OPENLIBRA_URL: 'openLibraUrl',
	COVER: 'cover',
	CATEGORIES: 'categories'
});

export const BOOK_FIELD_OPENLIBRA_MATCH = Object.freeze({
	id: 'ID',
	title: 'title',
	author: 'author',
	content: 'content',
	publisher: 'publisher',
	publisherDate: 'publisher_date',
	pages: 'pages',
	language: 'language',
	openLibraUrl: 'url_download',
	cover: 'cover',
	categories: 'categories'
});
