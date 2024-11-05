import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Task, TaskCreateDto, TaskUpdateDto } from '../models/task.model';
import { Observable } from 'rxjs';
import { DataList } from '../models/util.model';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private readonly API = environment.URL_BASE + '/tasks';
  private readonly http = inject(HttpClient);

  list(page: number, perPage: number): Observable<DataList<Task>> {
    const params = new HttpParams()
      .set('_page', page)
      .set('_per_page', perPage);
    return this.http.get<DataList<Task>>(this.API, { params });
  }

  findById(id: string): Observable<Task> {
    // http://localhost:3000/tasks/{{id}}
    return this.http.get<Task>(this.API + '/' + id);
  }

  create(task: TaskCreateDto): Observable<Task> {
    return this.http.post<Task>(this.API, task);
  }

  update(id: string, task: TaskUpdateDto): Observable<Task> {
    return this.http.patch<Task>(this.API + '/' + id, task);
  }

  delete(id: string): Observable<Task> {
    return this.http.delete<Task>(this.API + '/' + id);
  }
}
