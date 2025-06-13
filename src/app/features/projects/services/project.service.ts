import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

import { Project, ProjectPayload } from '@/types/projects.types';
import { environment } from 'environments/environment';

@Injectable({ providedIn: 'root' })
export class ProjectService {
    private http = inject(HttpClient);
    private apiUrl = environment.apiBaseUrl;
    private projects$ = new BehaviorSubject<Project[]>([]);

    get projects(): Observable<Project[]> {
        return this.projects$.asObservable();
    }

    fetchProjects() {
        this.http.get<Project[]>(`${this.apiUrl}/projects`)
            .subscribe(projects => this.projects$.next(projects));
    }

    addProject(payload: ProjectPayload): Observable<Project> {
        return this.http.post<Project>(`${this.apiUrl}/projects`, payload).pipe(
            tap(project => this.projects$.next([...this.projects$.value, {...project, tasks:[]}]))
        );
    }

    updateProject(id: number, payload: ProjectPayload): Observable<Project> {
        return this.http.patch<Project>(`${this.apiUrl}/projects/${id}`, payload).pipe(
            tap(updated => {
                const current = this.projects$.value.map(p => p.id === id ? updated : p);
                this.projects$.next(current);
            })
        );
    }

    getProjectById(id: number): Observable<Project> {
        return this.http.get<Project>(`${this.apiUrl}/projects/${id}`);
    }


    deleteProject(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/projects/${id}`).pipe(
            tap(() => {
                this.projects$.next(this.projects$.value.filter(p => p.id !== id));
            })
        );
    }


}
