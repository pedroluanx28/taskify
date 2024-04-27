type Task = {
    id: string;
    title: string;
    body: string;
    is_checked: boolean;
    task_group_id?: number;
    limit_date?: string;
    time_limit?: string;
    priority_id?: number;
};

type PaginatedTasks = GenericPagination<Task>;