import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TaskService } from '../services/task.service';
import { Task } from '@/types/task.types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-list',
  standalone: true,
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  imports: [CommonModule, RouterLink]
})
export class TaskListComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private taskService = inject(TaskService);
  private router = inject(Router);

  projectId!: number;
  tasks: Task[] = [];
  loading = true;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.projectId = Number(params.get('id'));
      this.loadTasks();
    });
  }

  getTasksByStatus(status: string) {
  return this.tasks.filter(t => t.status === status);
}


  loadTasks() {
    this.taskService.getTasks(this.projectId).subscribe(tasks => {
      this.tasks = tasks;
      this.loading = false;
    });
  }

  deleteTask(taskId: number) {
    if (confirm('Delete this task?')) {
      this.taskService.deleteTask(taskId).subscribe(() => {
        this.tasks = this.tasks.filter(t => t.id !== taskId);
      });
    }
  }

  editTask(taskId: number) {
    this.router.navigate(['/projects', this.projectId, 'tasks', taskId, 'edit']);
  }

  onAddTask() {
    this.router.navigate(['/projects', this.projectId, 'tasks', 'new']);
  }

  onEditTask(taskId: number) {
    this.router.navigate(['/projects', this.projectId, 'tasks', taskId, 'edit']);
  }

}
