export interface Task{
    id: string;
    title: string;
    completed: boolean;
    dueDate: Date;
    priority: "High" | "Medium" | "Low";
}