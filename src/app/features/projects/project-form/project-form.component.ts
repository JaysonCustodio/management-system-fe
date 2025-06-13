import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { CommonModule } from '@angular/common';
import { Project, ProjectPayload } from '@/types/projects.types';

@Component({
  selector: 'app-project-form',
  standalone: true,
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class ProjectFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private projectService = inject(ProjectService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]]
  });

  loading = false;
  error = '';
  projectId?: number;
  isEditMode = false;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.projectId = +id;
        this.loading = true;
        this.projectService.getProjectById(this.projectId).subscribe({
          next: (project: Project) => {
            this.form.patchValue({ name: project.name });
            this.loading = false;
          },
          error: err => {
            this.error = 'Project not found.';
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
    const { name } = this.form.value;
    if (!name) {
      this.error = 'Name is required.';
      this.loading = false;
      return;
    }
    const payload: ProjectPayload = { name };

    if (this.isEditMode && this.projectId) {
      this.projectService.updateProject(this.projectId, payload).subscribe({
        next: () => this.router.navigate(['/projects']),
        error: err => {
          this.error = err?.error?.message || 'Failed to update project';
          this.loading = false;
        }
      });
    } else {
      this.projectService.addProject(payload).subscribe({
        next: () => this.router.navigate(['/projects']),
        error: err => {
          this.error = err?.error?.message || 'Failed to create project';
          this.loading = false;
        }
      });
    }
  }

  onCancel() {
    this.router.navigate(['/projects']);
  }
}
