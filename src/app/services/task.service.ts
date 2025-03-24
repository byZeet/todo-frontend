import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../../app/models/task.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = `${environment.apiUrl}/tasks`;

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  getTaskById(id: string): Observable<Task> { // ✅ Nuevo método para obtener una tarea por ID
    return this.http.get<Task>(`${this.apiUrl}/${id}`);
  }

  addTask(
    title: string,
    color: string,
    date: Date,
    priority: 'high' | 'medium' | 'low',
    startTime: string,
    endTime: string,
    alert: boolean
  ): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, {
      title, color, date, priority, startTime, endTime, alert
    });
  }

  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  toggleTaskCompletion(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${task._id}`, {
      title: task.title,
      completed: !task.completed,
      date: task.date,
      color: task.color || '#ff66b2',
      priority: task.priority || 'medium',
      startTime: task.startTime || '00:00',
      endTime: task.endTime || '23:59',
      alert: task.alert || false
    });
  }

  editTaskTitle(id: string, title: string): Observable<Task> {
    return this.http.patch<Task>(`${this.apiUrl}/${id}`, { title });
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${task._id}`, task);
  }
}
