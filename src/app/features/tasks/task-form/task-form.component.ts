import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../services/task.service';
import { TaskPayload, Task } from '@/types/task.types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-form',
  standalone: true,
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class TaskFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private taskService = inject(TaskService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  form = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(2)]],
    description: ['', [Validators.required, Validators.minLength(6)]],
    status: ['todo', [Validators.required]]
  });

  loading = false;
  error = '';
  projectId!: number;
  taskId?: number;
  isEditMode = false;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.projectId = Number(params.get('id'));
      const taskId = params.get('taskId');
      if (taskId) {
        this.isEditMode = true;
        this.taskId = Number(taskId);
        this.loading = true;
        this.taskService.getTask(this.taskId).subscribe({
          next: (task: Task) => {
            this.form.patchValue({
              title: task.title,
              description: task.description,
              status: task.status
            });
            this.loading = false;
          },
          error: err => {
            this.error = 'Task not found.';
            this.loading = false;
          }
        });
      }
    });
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.loading = true;
    this.error = '';
    const { title, description, status } = this.form.value;
    if (!title || !description || !status) {
      this.error = 'All fields are required.';
      this.loading = false;
      return;
    }
    const payload: TaskPayload = { title, description, status };

    if (this.isEditMode && this.taskId) {
      this.taskService.updateTask(this.taskId, payload).subscribe({
        next: () => this.router.navigate(['/projects', this.projectId, 'tasks']),
        error: err => {
          this.error = err?.error?.message || 'Failed to update task';
          this.loading = false;
        }
      });
    } else {
      this.taskService.addTask(this.projectId, payload).subscribe({
        next: () => this.router.navigate(['/projects', this.projectId, 'tasks']),
        error: err => {
          this.error = err?.error?.message || 'Failed to add task';
          this.loading = false;
        }
      });
    }
  }

  onCancel() {
    this.router.navigate(['/projects', this.projectId, 'tasks']);
  }
}
