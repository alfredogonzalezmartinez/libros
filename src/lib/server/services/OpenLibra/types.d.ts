type Id = number;
type CategoryId = number;

interface ParamsApiOpenLibra {
	id?: id | null;
	book_title?: string | null;
	book_author?: string | null;
	publisher?: string | null;
	publisher_date?: string | null;
	lang?: string | null;
	keyword?: string | null;
	book_title_index?: string | null;
	category?: string | null;
	category_id?: categoryId | null;
	subcategory?: string | null;
	subcategory_id?: number | null;
	any_tags?: string[] | null;
	results_range?: number | null;
	criteria?: 'most_viewed' | 'most_commented' | null;
	order?: 'a_z' | 'z_a' | 'newest' | 'oldest' | null;
	since?: 'today' | 'last_week' | 'last_month' | 'last_year' | null;
	num_items?: number | null;
	count_items?: boolean | null;
	decode?: boolean | null;
	json?: boolean | null;
	get_categories?: 'all' | null;
	get_subcategories_by_category_ID?: number | null;
}

interface Book {
	ID: string;
	title: string;
	author: string;
	content: string;
	content_short: string;
	publisher: string;
	publisher_date: string;
	pages: string;
	language: string;
	url_details: string;
	url_download: string;
	cover: string;
	thumbnail: string;
	num_comments: string;
	categories: Category[];
	tags: Tag[];
}

interface Category {
	category_id: CategoryId;
	name: string;
	nicename: string;
}

interface Subcategory {
	subcategory_id: number;
	name: string;
	nicename: string;
}

interface Tag {
	tag_id: number;
	name: string;
	nicename: string;
}

type BooksFilters = Omit<
	ParamsApiOpenLibra,
	'id' | 'count_items' | 'decode' | 'json' | 'get_categories' | 'get_subcategories_by_category_ID'
>;
