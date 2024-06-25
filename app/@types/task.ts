type Task = {
    id: number;
    title: string;
    body: string;
    is_checked: boolean;
    task_group_id?: number;
    task_group?: Category;
    limit_date?: string;
    time_limit?: string;
    priority_id?: number;
    priority?: Priority;
};

type PaginatedTasks = GenericPagination<Task>;