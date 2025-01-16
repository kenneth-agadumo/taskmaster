export interface Task {
    id: number;
    title: string;
    category: string;
    priority: string; // Use `Date` if parsing is handled.
    status: string;
    startDate: string;
    endDate: string;
    projectId?: number;
  }

  export interface Project {
    id: number;
    title: string;
    tasks: Task[]
  }