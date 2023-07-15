// This code wrap the REST API of OpenLibra: https://openlibra.com/en/page/public-api

const urlApiOpenLibra = 'https://www.etnassoft.com/api/v1/get/';

async function fetchApiOpenLibra<T>(params: ParamsApiOpenLibra): Promise<T[]> {
	const searchParams = new URLSearchParams(Object.entries(params).filter((param) => param != null));
	const url = new URL(urlApiOpenLibra);
	url.search = searchParams.toString();
	return fetch(url)
		.then((response) => response.text())
		.then((text) => JSON.parse(text));
}

export function getBookById(id: Id): Promise<Book | undefined> {
	const params: ParamsApiOpenLibra = {
		id,
		json: true,
		decode: true
	};

	return fetchApiOpenLibra<Book>(params).then((books) => books.at(0));
}

export function getBooks(filters?: BooksFilters): Promise<Book[]> {
	const params: ParamsApiOpenLibra = {
		...filters,
		json: true,
		decode: true
	};

	return fetchApiOpenLibra(params);
}

export function getBooksCount(filters?: BooksFilters): Promise<Book[]> {
	const params: ParamsApiOpenLibra = {
		...filters,
		count_items: true,
		json: true,
		decode: true
	};

	return fetchApiOpenLibra(params);
}

export function getCategories(): Promise<Category[]> {
	const params: ParamsApiOpenLibra = {
		get_categories: 'all',
		json: true,
		decode: true
	};

	return fetchApiOpenLibra(params);
}

export function getCategoryById(id: CategoryId): Promise<Category | undefined> {
	const params: ParamsApiOpenLibra = {
		get_categories: 'all',
		json: true,
		decode: true
	};

	return fetchApiOpenLibra<Category>(params).then((categories) =>
		categories.find(({ category_id: categoryId }) => categoryId === id)
	);
}

export function getSubcategoriesByCategoryId(id: CategoryId): Promise<Subcategory[]> {
	const params: ParamsApiOpenLibra = {
		get_subcategories_by_category_ID: id,
		json: true,
		decode: true
	};

	return fetchApiOpenLibra(params);
}
