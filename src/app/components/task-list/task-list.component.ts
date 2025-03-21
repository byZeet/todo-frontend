import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
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
    MatListModule,
    MatIconModule,
  ],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  newTaskTitle: string = '';
  editingTaskId: string | null = null;
  editedTaskTitle: string = '';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  addTask(): void {
    if (!this.newTaskTitle.trim()) return;
    this.taskService.addTask(this.newTaskTitle).subscribe((newTask) => {
      this.tasks.push(newTask);
      this.newTaskTitle = '';
    });
  }

  deleteTask(id: string): void {
    this.taskService.deleteTask(id).subscribe(() => {
      this.tasks = this.tasks.filter((task) => task._id !== id);
    });
  }

  toggleCompletion(task: Task): void {
    this.taskService.toggleTaskCompletion(task).subscribe((updatedTask) => {
      const index = this.tasks.findIndex((t) => t._id === updatedTask._id);
      if (index !== -1) {
        this.tasks[index] = updatedTask;
      }
    });
  }

  startEditing(task: Task): void {
    this.editingTaskId = task._id;
    this.editedTaskTitle = task.title;
  }

  updateTaskTitle(task: Task): void {
    if (!this.editedTaskTitle.trim()) return;
    this.taskService.editTaskTitle(task._id, this.editedTaskTitle).subscribe((updatedTask) => {
      const index = this.tasks.findIndex((t) => t._id === updatedTask._id);
      if (index !== -1) {
        this.tasks[index] = updatedTask;
      }
      this.editingTaskId = null;
    });
  }

  cancelEditing(): void {
    this.editingTaskId = null;
  }
}
