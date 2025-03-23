import { Component, OnInit, HostListener, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatProgressBarModule,
  ],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  searchTerm: string = '';
  showTaskForm: boolean = false;
  newTaskTitle: string = '';
  isKeyboardOpen: boolean = false; // Detectar si el teclado está abierto en móvil

  constructor(private taskService: TaskService, private renderer: Renderer2) {}

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

  toggleCompletion(task: Task, event: Event): void {
    event.stopPropagation();
    task.completed = !task.completed;
  }

  trackTask(index: number, task: Task): string {
    return task._id;
  }

  openTaskForm(): void {
    this.showTaskForm = true;
    this.renderer.addClass(document.body, 'no-scroll'); // Bloquea el scroll
  }

  closeTaskForm(): void {
    this.showTaskForm = false;
    this.newTaskTitle = '';
    this.renderer.removeClass(document.body, 'no-scroll'); // Habilita el scroll
  }

  addTask(): void {
    if (!this.newTaskTitle.trim()) return;

    this.taskService.addTask(this.newTaskTitle).subscribe((newTask: Task) => {
      this.tasks.push(newTask);
      this.newTaskTitle = '';
      this.showTaskForm = false;
      this.renderer.removeClass(document.body, 'no-scroll'); // Habilita el scroll
    });
  }

  // Detectar cambios en la pantalla para ver si el teclado está abierto
  @HostListener('window:resize', [])
  onResize() {
    const screenHeight = window.innerHeight;
    const viewportHeight = window.visualViewport?.height || screenHeight;

    // Si la altura cambia significativamente, asumimos que el teclado está abierto
    this.isKeyboardOpen = viewportHeight < screenHeight * 0.8;
  }
}
