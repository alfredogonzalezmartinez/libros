// This code wrap the REST API of OpenLibra: https://openlibra.com/en/page/public-api

const OpenLibraApiUrl = 'https://www.etnassoft.com/api/v1/get/';

async function fetchOpenLibraApi<T>(params: OpenLibraApiParams): Promise<T> {
	const searchParams = new URLSearchParams(
		Object.entries(params).filter(([, value]) => value != null)
	);

	const url = new URL(OpenLibraApiUrl);
	url.search = searchParams.toString();

	return fetch(url)
		.then((response) => response.text())
		.then((text) => JSON.parse(text));
}

export function getOpenLibraBookById(id: Id): Promise<OpenLibraBook | undefined> {
	const params: OpenLibraApiParams = {
		id,
		json: true,
		decode: true
	};

	return fetchOpenLibraApi<OpenLibraBook[]>(params).then((books) => books.at(0));
}

export function getOpenLibraBooks(filters?: OpenLibraBooksFilters): Promise<OpenLibraBook[]> {
	const params: OpenLibraApiParams = {
		...filters,
		json: true,
		decode: true
	};

	return fetchOpenLibraApi(params);
}

export function getOpenLibraBooksCount(filters?: OpenLibraBooksFilters): Promise<number> {
	const params: OpenLibraApiParams = {
		...filters,
		count_items: true,
		json: true,
		decode: true
	};

	return fetchOpenLibraApi<OpenLibraNumItems>(params).then(({ num_items }) => num_items);
}

export function getOpenLibraCategories(): Promise<Category[]> {
	const params: OpenLibraApiParams = {
		get_categories: 'all',
		json: true,
		decode: true
	};

	return fetchOpenLibraApi(params);
}

export function getOpenLibraCategoryById(id: OpenLibraId): Promise<OpenLibraCategory | undefined> {
	const params: OpenLibraApiParams = {
		get_categories: 'all',
		json: true,
		decode: true
	};

	return fetchOpenLibraApi<OpenLibraCategory[]>(params).then((categories) =>
		categories.find(({ category_id: categoryId }) => categoryId === id)
	);
}

export function getOpenLibraSubcategoriesByCategoryId(
	id: OpenLibraId
): Promise<OpenLibraSubcategory[]> {
	const params: OpenLibraApiParams = {
		get_subcategories_by_category_ID: id,
		json: true,
		decode: true
	};

	return fetchOpenLibraApi(params);
}
