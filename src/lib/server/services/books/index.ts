import {
	getOpenLibraBookById,
	getOpenLibraBooks,
	getOpenLibraBooksCount,
	getOpenLibraCategories,
	getOpenLibraCategoryById,
	getOpenLibraSubcategoriesByCategoryId
} from '../OpenLibra';
import {
	parseBooksFilter,
	parseOpenLibraBook,
	parseOpenLibraBooks,
	parseOpenLibraCategory,
	parseOpenLibraSubcategory
} from './parsers';

export async function getBookById(
	id: Id,
	fieldsFilter?: BookField[]
): Promise<Partial<Book> | undefined> {
	const book = await getOpenLibraBookById(id);
	if (book != null) return parseOpenLibraBook(book, fieldsFilter);
}

export async function getBooks(
	filter: BooksFilter,
	fieldsFilter?: BookField[]
): Promise<(Book | Partial<Book>)[]> {
	const books: OpenLibraBook[] = await getOpenLibraBooks(parseBooksFilter(filter));

	return parseOpenLibraBooks(books, fieldsFilter);
}

export function getBooksCount(filter: BooksFilter): Promise<number> {
	return getOpenLibraBooksCount(parseBooksFilter(filter));
}

export async function getCategoryById(categoryId: Id): Promise<Category | undefined> {
	const category = await getOpenLibraCategoryById(categoryId);
	if (category != null) return parseOpenLibraCategory(category);
}

export async function getCategoryByIdWithSubcategories(
	categoryId: Id
): Promise<CategoryWithSubcategories | undefined> {
	const category = await getCategoryById(categoryId);
	if (category != null) return getCategoryWithSubcategories(category);
}

export async function getCategories(): Promise<Category[]> {
	const categories = await getOpenLibraCategories();
	return categories.map(parseOpenLibraCategory);
}

export async function getCategoriesWithSubcategories(): Promise<CategoryWithSubcategories[]> {
	const categories = await getCategories();
	return Promise.all(categories.map(getCategoryWithSubcategories));
}

export async function getSubcategoriesByCategoryId(id: Id): Promise<Category[]> {
	const subcategories = await getOpenLibraSubcategoriesByCategoryId(id);
	return subcategories.map(parseOpenLibraSubcategory);
}

async function getCategoryWithSubcategories(
	category: Category
): Promise<CategoryWithSubcategories> {
	const subcategories = await getSubcategoriesByCategoryId(category.id);
	return {
		...category,
		subcategories
	};
}

export async function existsCategory(categoryId: Id) {
	const category = await getOpenLibraCategoryById(categoryId);
	return category != null;
}
