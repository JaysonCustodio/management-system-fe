import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task, TaskPayload } from '@/types/task.types';
import { environment } from 'environments/environment';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiBaseUrl;

  getTasks(projectId: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/tasks?projectId=${projectId}`);
  }

  addTask(projectId: number, payload: TaskPayload): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}/tasks`, { ...payload, projectId });
  }

  updateTask(taskId: number, payload: TaskPayload): Observable<Task> {
    return this.http.patch<Task>(`${this.apiUrl}/tasks/${taskId}`, payload);
  }

  getTask(taskId: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/tasks/${taskId}`);
  }


  deleteTask(taskId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/tasks/${taskId}`);
  }
}
