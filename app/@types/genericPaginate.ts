type PaginationLink = {
	first: string;
	last: string;
	prev?: null;
	next: string;
	url: string;
	label: string;
	active: boolean;
};

type BasePaginationMeta = {
	from: number;
	links?: PaginationLink[] | null;
	path: string;
	to: number;
	total: number;
};

type GenericPagination<Type> = {
	links: PaginationLink;
	meta: BasePaginationMeta & {
		current_page: number;
		last_page: number;
		per_page: number;
	};
	results: Type[];
};