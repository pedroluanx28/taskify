type Category = {
    id: number;
    name: string;
    tasks: Task[];
}

type PaginatedCategories = GenericPagination<Category>;