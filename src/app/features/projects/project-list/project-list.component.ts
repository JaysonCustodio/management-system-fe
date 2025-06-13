import { Component, OnInit, inject } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Project } from '@/types/projects.types';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  private projectService = inject(ProjectService);
  private router = inject(Router);
  projects: Project[] = [];
  loading = true;

  ngOnInit() {
    this.projectService.fetchProjects();
    this.projectService.projects.subscribe(projects => {
      this.projects = projects;
      this.loading = false;
    });
  }

  goToProjectTasks(projectId: number) {
    this.router.navigate(['/projects', projectId, 'tasks']);
  }


  deleteProject(id: number) {
    if (confirm('Delete this project?')) {
      this.projectService.deleteProject(id).subscribe();
    }
  }

}
