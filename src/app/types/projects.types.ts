export interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
}

export interface Project {
  id: number;
  name: string;
  tasks: Task[];
}

export interface ProjectPayload {
  name: string;
  tasks?: Task[]; 
}
