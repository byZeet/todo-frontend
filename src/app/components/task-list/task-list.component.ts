import { Component, OnInit, HostListener, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  searchTerm: string = '';
  isKeyboardOpen: boolean = false;

  constructor(private taskService: TaskService, private renderer: Renderer2, private router: Router) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe((tasks: Task[]) => {
      this.tasks = tasks;
    });
  }

  get filteredTasks(): Task[] {
    return this.tasks.filter((task) =>
      task.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  get completedTasks(): number {
    return this.tasks.filter((task) => task.completed).length;
  }

  get progressPercentage(): number {
    return this.tasks.length === 0 ? 0 : Math.round((this.completedTasks / this.tasks.length) * 100);
  }

  deleteTask(id: string, event: Event): void {
    event.stopPropagation();
    this.taskService.deleteTask(id).subscribe(() => {
      this.tasks = this.tasks.filter((task) => task._id !== id);
    });
  }

  editTask(task: Task): void {
    this.router.navigate(['/edit-task', task._id]);
  }
  

  toggleCompletion(task: Task, event: Event): void {
    event.stopPropagation();
    this.taskService.toggleTaskCompletion(task).subscribe((updatedTask) => {
      task.completed = updatedTask.completed;
    });
  }

  trackTask(index: number, task: Task): string {
    return task._id;
  }

  // Redirigir a la página de creación de tarea
  goToCreateTask(): void {
    this.router.navigate(['/create-task']);
  }

  @HostListener('window:resize', [])
  onResize() {
    const screenHeight = window.innerHeight;
    const viewportHeight = window.visualViewport?.height || screenHeight;
    this.isKeyboardOpen = viewportHeight < screenHeight * 0.8;
  }
}
