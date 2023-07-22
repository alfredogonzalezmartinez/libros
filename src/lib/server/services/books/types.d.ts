type Id = number;
type OrderFilter = 'a_z' | 'z_a' | 'newest' | 'oldest';
type BookField = keyof Book;

interface BooksFilter {
	title?: string | null;
	category?: string | null;
	subcategory?: string | null;
	language?: string | null;
	order?: OrderFilter | null;
	limit?: number | null;
	offset?: number | null;
}

interface Book {
	id: Id;
	title: string;
	author: string;
	content: string;
	publisher: string;
	publisherDate: string;
	pages: number;
	language: string;
	openLibraUrl: string;
	cover: string;
	categories: Category[];
}

interface Category {
	id: Id;
	name: string;
}

interface CategoryWithSubcategories {
	id: Id;
	name: string;
	subcategories: Category[];
}
