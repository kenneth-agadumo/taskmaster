export interface Task {
    id: string;
    title: string;
    category: string;
    priority: string; // Use `Date` if parsing is handled.
    status: string;
    startDate: string;
    endDate: string;
    projectId?: number;
  }

  export interface Project {
    id: string;
    title: string;
    tasks: Task[]
  }